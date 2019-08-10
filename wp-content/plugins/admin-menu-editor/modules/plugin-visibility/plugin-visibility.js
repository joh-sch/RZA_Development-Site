var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="lodash-3.10.d.ts" />
/// <reference path="common.d.ts" />
var AmeBaseActor = /** @class */ (function () {
    function AmeBaseActor(id, displayName, capabilities, metaCapabilities) {
        if (metaCapabilities === void 0) { metaCapabilities = {}; }
        this.displayName = '[Error: No displayName set]';
        this.groupActors = [];
        this.id = id;
        this.displayName = displayName;
        this.capabilities = capabilities;
        this.metaCapabilities = metaCapabilities;
    }
    /**
     * Get the capability setting directly from this actor, ignoring capabilities
     * granted by roles, the Super Admin flag, or the grantedCapabilities feature.
     *
     * Returns NULL for capabilities that are neither explicitly granted nor denied.
     *
     * @param {string} capability
     * @returns {boolean|null}
     */
    AmeBaseActor.prototype.hasOwnCap = function (capability) {
        if (this.capabilities.hasOwnProperty(capability)) {
            return this.capabilities[capability];
        }
        if (this.metaCapabilities.hasOwnProperty(capability)) {
            return this.metaCapabilities[capability];
        }
        return null;
    };
    AmeBaseActor.getActorSpecificity = function (actorId) {
        var actorType = actorId.substring(0, actorId.indexOf(':')), specificity = 0;
        switch (actorType) {
            case 'role':
                specificity = 1;
                break;
            case 'special':
                specificity = 2;
                break;
            case 'user':
                specificity = 10;
                break;
            default:
                specificity = 0;
        }
        return specificity;
    };
    AmeBaseActor.prototype.toString = function () {
        return this.displayName + ' [' + this.id + ']';
    };
    AmeBaseActor.prototype.getId = function () {
        return this.id;
    };
    AmeBaseActor.prototype.getDisplayName = function () {
        return this.displayName;
    };
    return AmeBaseActor;
}());
var AmeRole = /** @class */ (function (_super) {
    __extends(AmeRole, _super);
    function AmeRole(roleId, displayName, capabilities, metaCapabilities) {
        if (metaCapabilities === void 0) { metaCapabilities = {}; }
        var _this = _super.call(this, 'role:' + roleId, displayName, capabilities, metaCapabilities) || this;
        _this.name = roleId;
        return _this;
    }
    AmeRole.prototype.hasOwnCap = function (capability) {
        //In WordPress, a role name is also a capability name. Users that have the role "foo" always
        //have the "foo" capability. It's debatable whether the role itself actually has that capability
        //(WP_Role says no), but it's convenient to treat it that way.
        if (capability === this.name) {
            return true;
        }
        return _super.prototype.hasOwnCap.call(this, capability);
    };
    return AmeRole;
}(AmeBaseActor));
var AmeUser = /** @class */ (function (_super) {
    __extends(AmeUser, _super);
    function AmeUser(userLogin, displayName, capabilities, roles, isSuperAdmin, userId, metaCapabilities) {
        if (isSuperAdmin === void 0) { isSuperAdmin = false; }
        if (metaCapabilities === void 0) { metaCapabilities = {}; }
        var _this = _super.call(this, 'user:' + userLogin, displayName, capabilities, metaCapabilities) || this;
        _this.userId = 0;
        _this.isSuperAdmin = false;
        _this.avatarHTML = '';
        _this.userLogin = userLogin;
        _this.roles = roles;
        _this.isSuperAdmin = isSuperAdmin;
        _this.userId = userId || 0;
        if (_this.isSuperAdmin) {
            _this.groupActors.push(AmeSuperAdmin.permanentActorId);
        }
        for (var i = 0; i < _this.roles.length; i++) {
            _this.groupActors.push('role:' + _this.roles[i]);
        }
        return _this;
    }
    AmeUser.createFromProperties = function (properties) {
        var user = new AmeUser(properties.user_login, properties.display_name, properties.capabilities, properties.roles, properties.is_super_admin, properties.hasOwnProperty('id') ? properties.id : null, properties.meta_capabilities);
        if (properties.avatar_html) {
            user.avatarHTML = properties.avatar_html;
        }
        return user;
    };
    return AmeUser;
}(AmeBaseActor));
var AmeSuperAdmin = /** @class */ (function (_super) {
    __extends(AmeSuperAdmin, _super);
    function AmeSuperAdmin() {
        return _super.call(this, AmeSuperAdmin.permanentActorId, 'Super Admin', {}) || this;
    }
    AmeSuperAdmin.prototype.hasOwnCap = function (capability) {
        //The Super Admin has all possible capabilities except the special "do_not_allow" flag.
        return (capability !== 'do_not_allow');
    };
    AmeSuperAdmin.permanentActorId = 'special:super_admin';
    return AmeSuperAdmin;
}(AmeBaseActor));
var AmeActorManager = /** @class */ (function () {
    function AmeActorManager(roles, users, isMultisite, suspectedMetaCaps) {
        if (isMultisite === void 0) { isMultisite = false; }
        if (suspectedMetaCaps === void 0) { suspectedMetaCaps = {}; }
        var _this = this;
        this.roles = {};
        this.users = {};
        this.grantedCapabilities = {};
        this.isMultisite = false;
        this.exclusiveSuperAdminCapabilities = {};
        this.tagMetaCaps = {};
        this.suggestedCapabilities = [];
        this.isMultisite = !!isMultisite;
        AmeActorManager._.forEach(roles, function (roleDetails, id) {
            var role = new AmeRole(id, roleDetails.name, roleDetails.capabilities, AmeActorManager._.get(roleDetails, 'meta_capabilities', {}));
            _this.roles[role.name] = role;
        });
        AmeActorManager._.forEach(users, function (userDetails) {
            var user = AmeUser.createFromProperties(userDetails);
            _this.users[user.userLogin] = user;
        });
        if (this.isMultisite) {
            this.superAdmin = new AmeSuperAdmin();
        }
        this.suspectedMetaCaps = suspectedMetaCaps;
        var exclusiveCaps = [
            'update_core', 'update_plugins', 'delete_plugins', 'install_plugins', 'upload_plugins', 'update_themes',
            'delete_themes', 'install_themes', 'upload_themes', 'update_core', 'edit_css', 'unfiltered_html',
            'edit_files', 'edit_plugins', 'edit_themes', 'delete_user', 'delete_users'
        ];
        for (var i = 0; i < exclusiveCaps.length; i++) {
            this.exclusiveSuperAdminCapabilities[exclusiveCaps[i]] = true;
        }
        var tagMetaCaps = [
            'manage_post_tags', 'edit_categories', 'edit_post_tags', 'delete_categories',
            'delete_post_tags'
        ];
        for (var i = 0; i < tagMetaCaps.length; i++) {
            this.tagMetaCaps[tagMetaCaps[i]] = true;
        }
    }
    // noinspection JSUnusedGlobalSymbols
    AmeActorManager.prototype.actorCanAccess = function (actorId, grantAccess, defaultCapability) {
        if (defaultCapability === void 0) { defaultCapability = null; }
        if (grantAccess.hasOwnProperty(actorId)) {
            return grantAccess[actorId];
        }
        if (defaultCapability !== null) {
            return this.hasCap(actorId, defaultCapability, grantAccess);
        }
        return true;
    };
    AmeActorManager.prototype.getActor = function (actorId) {
        if (actorId === AmeSuperAdmin.permanentActorId) {
            return this.superAdmin;
        }
        var separator = actorId.indexOf(':'), actorType = actorId.substring(0, separator), actorKey = actorId.substring(separator + 1);
        if (actorType === 'role') {
            return this.roles.hasOwnProperty(actorKey) ? this.roles[actorKey] : null;
        }
        else if (actorType === 'user') {
            return this.users.hasOwnProperty(actorKey) ? this.users[actorKey] : null;
        }
        throw {
            name: 'InvalidActorException',
            message: "There is no actor with that ID, or the ID is invalid.",
            value: actorId
        };
    };
    AmeActorManager.prototype.actorExists = function (actorId) {
        try {
            return (this.getActor(actorId) !== null);
        }
        catch (exception) {
            if (exception.hasOwnProperty('name') && (exception.name === 'InvalidActorException')) {
                return false;
            }
            else {
                throw exception;
            }
        }
    };
    AmeActorManager.prototype.hasCap = function (actorId, capability, context) {
        context = context || {};
        return this.actorHasCap(actorId, capability, [context, this.grantedCapabilities]);
    };
    AmeActorManager.prototype.hasCapByDefault = function (actorId, capability) {
        return this.actorHasCap(actorId, capability);
    };
    AmeActorManager.prototype.actorHasCap = function (actorId, capability, contextList) {
        //It's like the chain-of-responsibility pattern.
        //Everybody has the "exist" cap and it can't be removed or overridden by plugins.
        if (capability === 'exist') {
            return true;
        }
        capability = this.mapMetaCap(capability);
        var result = null;
        //Step #1: Check temporary context - unsaved caps, etc. Optional.
        //Step #2: Check granted capabilities. Default on, but can be skipped.
        if (contextList) {
            //Check for explicit settings first.
            var actorValue = void 0, len = contextList.length;
            for (var i = 0; i < len; i++) {
                if (contextList[i].hasOwnProperty(actorId)) {
                    actorValue = contextList[i][actorId];
                    if (typeof actorValue === 'boolean') {
                        //Context: grant_access[actorId] = boolean. Necessary because enabling a menu item for a role
                        //should also enable it for all users who have that role (unless explicitly disabled for a user).
                        return actorValue;
                    }
                    else if (actorValue.hasOwnProperty(capability)) {
                        //Context: grantedCapabilities[actor][capability] = boolean|[boolean, ...]
                        result = actorValue[capability];
                        return (typeof result === 'boolean') ? result : result[0];
                    }
                }
            }
        }
        //Step #3: Check owned/default capabilities. Always checked.
        var actor = this.getActor(actorId);
        if (actor === null) {
            return false;
        }
        var hasOwnCap = actor.hasOwnCap(capability);
        if (hasOwnCap !== null) {
            return hasOwnCap;
        }
        //Step #4: Users can get a capability through their roles or the "super admin" flag.
        //Only users can have inherited capabilities, so if this actor is not a user, we're done.
        if (actor instanceof AmeUser) {
            //Note that Super Admin has priority. If the user is a super admin, their roles are ignored.
            if (actor.isSuperAdmin) {
                return this.actorHasCap('special:super_admin', capability, contextList);
            }
            //Check if any of the user's roles have the capability.
            result = null;
            for (var index = 0; index < actor.roles.length; index++) {
                var roleHasCap = this.actorHasCap('role:' + actor.roles[index], capability, contextList);
                if (roleHasCap !== null) {
                    result = result || roleHasCap;
                }
            }
            if (result !== null) {
                return result;
            }
        }
        if (this.suspectedMetaCaps.hasOwnProperty(capability)) {
            return null;
        }
        return false;
    };
    AmeActorManager.prototype.mapMetaCap = function (capability) {
        if (capability === 'customize') {
            return 'edit_theme_options';
        }
        else if (capability === 'delete_site') {
            return 'manage_options';
        }
        //In Multisite, some capabilities are only available to Super Admins.
        if (this.isMultisite && this.exclusiveSuperAdminCapabilities.hasOwnProperty(capability)) {
            return AmeSuperAdmin.permanentActorId;
        }
        if (this.tagMetaCaps.hasOwnProperty(capability)) {
            return 'manage_categories';
        }
        if ((capability === 'assign_categories') || (capability === 'assign_post_tags')) {
            return 'edit_posts';
        }
        return capability;
    };
    /* -------------------------------
     * Roles
     * ------------------------------- */
    AmeActorManager.prototype.getRoles = function () {
        return this.roles;
    };
    AmeActorManager.prototype.roleExists = function (roleId) {
        return this.roles.hasOwnProperty(roleId);
    };
    ;
    AmeActorManager.prototype.getSuperAdmin = function () {
        return this.superAdmin;
    };
    /* -------------------------------
     * Users
     * ------------------------------- */
    AmeActorManager.prototype.getUsers = function () {
        return this.users;
    };
    AmeActorManager.prototype.getUser = function (login) {
        return this.users.hasOwnProperty(login) ? this.users[login] : null;
    };
    AmeActorManager.prototype.addUsers = function (newUsers) {
        var _this = this;
        AmeActorManager._.forEach(newUsers, function (user) {
            _this.users[user.userLogin] = user;
        });
    };
    AmeActorManager.prototype.getGroupActorsFor = function (userLogin) {
        return this.users[userLogin].groupActors;
    };
    /* -------------------------------
     * Granted capability manipulation
     * ------------------------------- */
    AmeActorManager.prototype.setGrantedCapabilities = function (newGrants) {
        this.grantedCapabilities = AmeActorManager._.cloneDeep(newGrants);
    };
    AmeActorManager.prototype.getGrantedCapabilities = function () {
        return this.grantedCapabilities;
    };
    /**
     * Grant or deny a capability to an actor.
     */
    AmeActorManager.prototype.setCap = function (actor, capability, hasCap, sourceType, sourceName) {
        this.setCapInContext(this.grantedCapabilities, actor, capability, hasCap, sourceType, sourceName);
    };
    AmeActorManager.prototype.setCapInContext = function (context, actor, capability, hasCap, sourceType, sourceName) {
        capability = this.mapMetaCap(capability);
        var grant = sourceType ? [hasCap, sourceType, sourceName || null] : hasCap;
        AmeActorManager._.set(context, [actor, capability], grant);
    };
    AmeActorManager.prototype.resetCapInContext = function (context, actor, capability) {
        capability = this.mapMetaCap(capability);
        if (AmeActorManager._.has(context, [actor, capability])) {
            delete context[actor][capability];
        }
    };
    /**
     * Remove redundant granted capabilities.
     *
     * For example, if user "jane" has been granted the "edit_posts" capability both directly and via the Editor role,
     * the direct grant is redundant. We can remove it. Jane will still have "edit_posts" because she's an editor.
     */
    AmeActorManager.prototype.pruneGrantedUserCapabilities = function () {
        var _this = this;
        var _ = AmeActorManager._, pruned = _.cloneDeep(this.grantedCapabilities), context = [pruned];
        var actorKeys = _(pruned).keys().filter(function (actorId) {
            //Skip users that are not loaded.
            var actor = _this.getActor(actorId);
            if (actor === null) {
                return false;
            }
            return (actor instanceof AmeUser);
        }).value();
        _.forEach(actorKeys, function (actor) {
            _.forEach(_.keys(pruned[actor]), function (capability) {
                var grant = pruned[actor][capability];
                delete pruned[actor][capability];
                var hasCap = _.isArray(grant) ? grant[0] : grant, hasCapWhenPruned = !!_this.actorHasCap(actor, capability, context);
                if (hasCap !== hasCapWhenPruned) {
                    pruned[actor][capability] = grant; //Restore.
                }
            });
        });
        this.setGrantedCapabilities(pruned);
        return pruned;
    };
    ;
    /**
     * Compare the specificity of two actors.
     *
     * Returns 1 if the first actor is more specific than the second, 0 if they're both
     * equally specific, and -1 if the second actor is more specific.
     *
     * @return {Number}
     */
    AmeActorManager.compareActorSpecificity = function (actor1, actor2) {
        var delta = AmeBaseActor.getActorSpecificity(actor1) - AmeBaseActor.getActorSpecificity(actor2);
        if (delta !== 0) {
            delta = (delta > 0) ? 1 : -1;
        }
        return delta;
    };
    ;
    AmeActorManager.prototype.generateCapabilitySuggestions = function (capPower) {
        var _ = AmeActorManager._;
        var capsByPower = _.memoize(function (role) {
            var sortedCaps = _.reduce(role.capabilities, function (result, hasCap, capability) {
                if (hasCap) {
                    result.push({
                        capability: capability,
                        power: _.get(capPower, [capability], 0)
                    });
                }
                return result;
            }, []);
            sortedCaps = _.sortBy(sortedCaps, function (item) { return -item.power; });
            return sortedCaps;
        });
        var rolesByPower = _.values(this.getRoles()).sort(function (a, b) {
            var aCaps = capsByPower(a), bCaps = capsByPower(b);
            //Prioritise roles with the highest number of the most powerful capabilities.
            var i = 0, limit = Math.min(aCaps.length, bCaps.length);
            for (; i < limit; i++) {
                var delta_1 = bCaps[i].power - aCaps[i].power;
                if (delta_1 !== 0) {
                    return delta_1;
                }
            }
            //Give a tie to the role that has more capabilities.
            var delta = bCaps.length - aCaps.length;
            if (delta !== 0) {
                return delta;
            }
            //Failing that, just sort alphabetically.
            if (a.displayName > b.displayName) {
                return 1;
            }
            else if (a.displayName < b.displayName) {
                return -1;
            }
            return 0;
        });
        var preferredCaps = [
            'manage_network_options',
            'install_plugins', 'edit_plugins', 'delete_users',
            'manage_options', 'switch_themes',
            'edit_others_pages', 'edit_others_posts', 'edit_pages',
            'unfiltered_html',
            'publish_posts', 'edit_posts',
            'read'
        ];
        var deprecatedCaps = _(_.range(0, 10)).map(function (level) { return 'level_' + level; }).value();
        deprecatedCaps.push('edit_files');
        var findDiscriminant = function (caps, includeRoles, excludeRoles) {
            var getEnabledCaps = function (role) {
                return _.keys(_.pick(role.capabilities, _.identity));
            };
            //Find caps that all of the includeRoles have and excludeRoles don't.
            var includeCaps = _.intersection.apply(_, _.map(includeRoles, getEnabledCaps)), excludeCaps = _.union.apply(_, _.map(excludeRoles, getEnabledCaps)), possibleCaps = _.without.apply(_, [includeCaps].concat(excludeCaps).concat(deprecatedCaps));
            var bestCaps = _.intersection(preferredCaps, possibleCaps);
            if (bestCaps.length > 0) {
                return bestCaps[0];
            }
            else if (possibleCaps.length > 0) {
                return possibleCaps[0];
            }
            return null;
        };
        var suggestedCapabilities = [];
        for (var i = 0; i < rolesByPower.length; i++) {
            var role = rolesByPower[i];
            var cap = findDiscriminant(preferredCaps, _.slice(rolesByPower, 0, i + 1), _.slice(rolesByPower, i + 1, rolesByPower.length));
            suggestedCapabilities.push({ role: role, capability: cap });
        }
        var previousSuggestion = null;
        for (var i = suggestedCapabilities.length - 1; i >= 0; i--) {
            if (suggestedCapabilities[i].capability === null) {
                suggestedCapabilities[i].capability =
                    previousSuggestion ? previousSuggestion : 'exist';
            }
            else {
                previousSuggestion = suggestedCapabilities[i].capability;
            }
        }
        this.suggestedCapabilities = suggestedCapabilities;
    };
    AmeActorManager.prototype.getSuggestedCapabilities = function () {
        return this.suggestedCapabilities;
    };
    AmeActorManager.prototype.createUserFromProperties = function (properties) {
        return AmeUser.createFromProperties(properties);
    };
    AmeActorManager._ = wsAmeLodash;
    return AmeActorManager;
}());
if (typeof wsAmeActorData !== 'undefined') {
    AmeActors = new AmeActorManager(wsAmeActorData.roles, wsAmeActorData.users, wsAmeActorData.isMultisite, wsAmeActorData.suspectedMetaCaps);
    if (typeof wsAmeActorData['capPower'] !== 'undefined') {
        AmeActors.generateCapabilitySuggestions(wsAmeActorData['capPower']);
    }
}
/// <reference path="../../js/jquery.d.ts" />
/// <reference path="../../js/jquery-json.d.ts" />
/// <reference path="../../js/actor-manager.ts" />
var AmeActorSelector = /** @class */ (function () {
    function AmeActorSelector(actorManager, isProVersion, allOptionEnabled) {
        if (allOptionEnabled === void 0) { allOptionEnabled = true; }
        var _this = this;
        this.selectedActor = null;
        this.selectedDisplayName = 'All';
        this.visibleUsers = [];
        this.subscribers = [];
        this.isProVersion = false;
        this.allOptionEnabled = true;
        this.cachedVisibleActors = null;
        this.actorManager = actorManager;
        if (typeof isProVersion !== 'undefined') {
            this.isProVersion = isProVersion;
        }
        this.allOptionEnabled = allOptionEnabled;
        this.currentUserLogin = wsAmeActorSelectorData.currentUserLogin;
        this.visibleUsers = wsAmeActorSelectorData.visibleUsers;
        this.ajaxParams = wsAmeActorSelectorData;
        //Discard any users that don't exist / were not loaded by the actor manager.
        var _ = AmeActorSelector._;
        this.visibleUsers = _.intersection(this.visibleUsers, _.keys(actorManager.getUsers()));
        if (jQuery.isReady) {
            this.initDOM();
        }
        else {
            jQuery(function () {
                _this.initDOM();
            });
        }
    }
    AmeActorSelector.prototype.initDOM = function () {
        var _this = this;
        this.selectorNode = jQuery('#ws_actor_selector');
        this.populateActorSelector();
        //Don't show the selector in the free version.
        if (!this.isProVersion) {
            this.selectorNode.hide();
            return;
        }
        //Select an actor on click.
        this.selectorNode.on('click', 'li a.ws_actor_option', function (event) {
            var actor = jQuery(event.target).attr('href').substring(1);
            if (actor === '') {
                actor = null;
            }
            _this.setSelectedActor(actor);
            event.preventDefault();
        });
        //Display the user selection dialog when the user clicks "Choose users".
        this.selectorNode.on('click', '#ws_show_more_users', function (event) {
            event.preventDefault();
            AmeVisibleUserDialog.open({
                currentUserLogin: _this.currentUserLogin,
                users: _this.actorManager.getUsers(),
                visibleUsers: _this.visibleUsers,
                actorManager: _this.actorManager,
                save: function (userDetails, selectedUsers) {
                    _this.actorManager.addUsers(userDetails);
                    _this.visibleUsers = selectedUsers;
                    //The user list has changed, so clear the cache.
                    _this.cachedVisibleActors = null;
                    //Display the new actor list.
                    _this.populateActorSelector();
                    //Save the user list via AJAX.
                    _this.saveVisibleUsers();
                }
            });
        });
    };
    AmeActorSelector.prototype.setSelectedActor = function (actorId) {
        if ((actorId !== null) && !this.actorManager.actorExists(actorId)) {
            return;
        }
        var previousSelection = this.selectedActor;
        this.selectedActor = actorId;
        this.highlightSelectedActor();
        if (actorId !== null) {
            this.selectedDisplayName = this.actorManager.getActor(actorId).getDisplayName();
        }
        else {
            this.selectedDisplayName = 'All';
        }
        //Notify subscribers that the selection has changed.
        if (this.selectedActor !== previousSelection) {
            for (var i = 0; i < this.subscribers.length; i++) {
                this.subscribers[i](this.selectedActor, previousSelection);
            }
        }
    };
    AmeActorSelector.prototype.onChange = function (callback) {
        this.subscribers.push(callback);
    };
    AmeActorSelector.prototype.highlightSelectedActor = function () {
        //Deselect the previous item.
        this.selectorNode.find('.current').removeClass('current');
        //Select the new one or "All".
        var selector;
        if (this.selectedActor === null) {
            selector = 'a.ws_no_actor';
        }
        else {
            selector = 'a[href$="#' + this.selectedActor + '"]';
        }
        this.selectorNode.find(selector).addClass('current');
    };
    AmeActorSelector.prototype.populateActorSelector = function () {
        var actorSelector = this.selectorNode, $ = jQuery;
        var isSelectedActorVisible = false;
        //Build the list of available actors.
        actorSelector.empty();
        if (this.allOptionEnabled) {
            actorSelector.append('<li><a href="#" class="current ws_actor_option ws_no_actor" data-text="All">All</a></li>');
        }
        var visibleActors = this.getVisibleActors();
        for (var i = 0; i < visibleActors.length; i++) {
            var actor = visibleActors[i], name_1 = this.getNiceName(actor);
            actorSelector.append($('<li></li>').append($('<a></a>')
                .attr('href', '#' + actor.getId())
                .attr('data-text', name_1)
                .text(name_1)
                .addClass('ws_actor_option')));
            isSelectedActorVisible = (actor.getId() === this.selectedActor) || isSelectedActorVisible;
        }
        if (this.isProVersion) {
            var moreUsersText = 'Choose users\u2026';
            actorSelector.append($('<li>').append($('<a></a>')
                .attr('id', 'ws_show_more_users')
                .attr('href', '#more-users')
                .attr('data-text', moreUsersText)
                .text(moreUsersText)));
        }
        if (this.isProVersion) {
            actorSelector.show();
        }
        //If the selected actor is no longer on the list, select the first available option instead.
        if ((this.selectedActor !== null) && !isSelectedActorVisible) {
            if (this.allOptionEnabled) {
                this.setSelectedActor(null);
            }
            else {
                var availableActors = this.getVisibleActors();
                this.setSelectedActor(AmeActorSelector._.first(availableActors).getId());
            }
        }
        this.highlightSelectedActor();
    };
    AmeActorSelector.prototype.repopulate = function () {
        this.cachedVisibleActors = null;
        this.populateActorSelector();
    };
    AmeActorSelector.prototype.getVisibleActors = function () {
        var _this = this;
        if (this.cachedVisibleActors) {
            return this.cachedVisibleActors;
        }
        var _ = AmeActorSelector._;
        var actors = [];
        //Include all roles.
        //Idea: Sort roles either alphabetically or by typical privilege level (admin, editor, author, ...).
        _.forEach(this.actorManager.getRoles(), function (role) {
            actors.push(role);
        });
        //Include the Super Admin (multisite only).
        if (this.actorManager.getUser(this.currentUserLogin).isSuperAdmin) {
            actors.push(this.actorManager.getSuperAdmin());
        }
        //Include the current user.
        actors.push(this.actorManager.getUser(this.currentUserLogin));
        //Include other visible users.
        _(this.visibleUsers)
            .without(this.currentUserLogin)
            .sortBy()
            .forEach(function (login) {
            var user = _this.actorManager.getUser(login);
            actors.push(user);
        })
            .value();
        this.cachedVisibleActors = actors;
        return actors;
    };
    AmeActorSelector.prototype.saveVisibleUsers = function () {
        jQuery.post(this.ajaxParams.adminAjaxUrl, {
            'action': this.ajaxParams.ajaxUpdateAction,
            '_ajax_nonce': this.ajaxParams.ajaxUpdateNonce,
            'visible_users': jQuery.toJSON(this.visibleUsers)
        });
    };
    AmeActorSelector.prototype.getCurrentUserActor = function () {
        return this.actorManager.getUser(this.currentUserLogin);
    };
    AmeActorSelector.prototype.getNiceName = function (actor) {
        var name = actor.getDisplayName();
        if (actor.hasOwnProperty('userLogin')) {
            var user = actor;
            if (user.userLogin === this.currentUserLogin) {
                name = 'Current user (' + user.userLogin + ')';
            }
            else {
                name = user.getDisplayName() + ' (' + user.userLogin + ')';
            }
        }
        return name;
    };
    AmeActorSelector._ = wsAmeLodash;
    return AmeActorSelector;
}());
/// <reference path="../../js/knockout.d.ts" />
/// <reference path="../../js/jquery.d.ts" />
/// <reference path="../../js/jqueryui.d.ts" />
/// <reference path="../../js/lodash-3.10.d.ts" />
/// <reference path="../../modules/actor-selector/actor-selector.ts" />
/// <reference path="../../ajax-wrapper/ajax-action-wrapper.d.ts" />
var AmePluginVisibilityModule = /** @class */ (function () {
    function AmePluginVisibilityModule(scriptData) {
        var _this = this;
        var _ = AmePluginVisibilityModule._;
        this.actorSelector = new AmeActorSelector(AmeActors, scriptData.isProVersion);
        //Wrap the selected actor in a computed observable so that it can be used with Knockout.
        var _selectedActor = ko.observable(this.actorSelector.selectedActor);
        this.selectedActor = ko.computed({
            read: function () {
                return _selectedActor();
            },
            write: function (newActor) {
                _this.actorSelector.setSelectedActor(newActor);
            }
        });
        this.actorSelector.onChange(function (newSelectedActor) {
            _selectedActor(newSelectedActor);
        });
        //Re-select the previously selected actor, or select "All" (null) by default.
        this.selectedActor(scriptData.selectedActor);
        this.canRoleManagePlugins = scriptData.canManagePlugins;
        this.isMultisite = scriptData.isMultisite;
        this.grantAccessByDefault = {};
        _.forEach(this.actorSelector.getVisibleActors(), function (actor) {
            _this.grantAccessByDefault[actor.id] = ko.observable(_.get(scriptData.settings.grantAccessByDefault, actor.id, _this.canManagePlugins(actor)));
        });
        this.plugins = _.map(scriptData.installedPlugins, function (plugin) {
            return new AmePlugin(plugin, _.get(scriptData.settings.plugins, plugin.fileName, {}), _this);
        });
        //Normally, the plugin list is sorted by the (real) plugin name. Re-sort taking custom names into account.
        this.plugins.sort(function (a, b) {
            return a.name().localeCompare(b.name());
        });
        this.privilegedActors = [this.actorSelector.getCurrentUserActor()];
        if (this.isMultisite) {
            this.privilegedActors.push(AmeActors.getSuperAdmin());
        }
        this.areNewPluginsVisible = ko.computed({
            read: function () {
                if (_this.selectedActor() !== null) {
                    var canSeePluginsByDefault = _this.getGrantAccessByDefault(_this.selectedActor());
                    return canSeePluginsByDefault();
                }
                return _.every(_this.actorSelector.getVisibleActors(), function (actor) {
                    //Only consider roles than can manage plugins.
                    if (!_this.canManagePlugins(actor)) {
                        return true;
                    }
                    var canSeePluginsByDefault = _this.getGrantAccessByDefault(actor.getId());
                    return canSeePluginsByDefault();
                });
            },
            write: function (isChecked) {
                if (_this.selectedActor() !== null) {
                    var canSeePluginsByDefault = _this.getGrantAccessByDefault(_this.selectedActor());
                    canSeePluginsByDefault(isChecked);
                    return;
                }
                //Update everyone except the current user and Super Admin.
                _.forEach(_this.actorSelector.getVisibleActors(), function (actor) {
                    var isAllowed = _this.getGrantAccessByDefault(actor.getId());
                    if (!_this.canManagePlugins(actor)) {
                        isAllowed(false);
                    }
                    else if (_.includes(_this.privilegedActors, actor)) {
                        isAllowed(true);
                    }
                    else {
                        isAllowed(isChecked);
                    }
                });
            }
        });
        this.areAllPluginsChecked = ko.computed({
            read: function () {
                return _.every(_this.plugins, function (plugin) {
                    return _this.isPluginVisible(plugin);
                }) && _this.areNewPluginsVisible();
            },
            write: function (isChecked) {
                _this.areNewPluginsVisible(isChecked);
                _.forEach(_this.plugins, function (plugin) {
                    _this.setPluginVisibility(plugin, isChecked);
                });
            }
        });
        //This observable will be populated when saving changes.
        this.settingsData = ko.observable('');
    }
    AmePluginVisibilityModule.prototype.isPluginVisible = function (plugin) {
        var actorId = this.selectedActor();
        if (actorId === null) {
            return plugin.isVisibleByDefault();
        }
        else {
            var canSeePluginsByDefault = this.getGrantAccessByDefault(actorId), isVisible = plugin.getGrantObservable(actorId, plugin.isVisibleByDefault() && canSeePluginsByDefault());
            return isVisible();
        }
    };
    AmePluginVisibilityModule.prototype.setPluginVisibility = function (plugin, isVisible) {
        var _this = this;
        var selectedActor = this.selectedActor();
        if (selectedActor === null) {
            plugin.isVisibleByDefault(isVisible);
            //Show/hide from everyone except the current user and Super Admin.
            //However, don't enable plugins for roles that can't access the "Plugins" page in the first place.
            var _1 = AmePluginVisibilityModule._;
            _1.forEach(this.actorSelector.getVisibleActors(), function (actor) {
                var allowAccess = plugin.getGrantObservable(actor.id, isVisible);
                if (!_this.canManagePlugins(actor)) {
                    allowAccess(false);
                }
                else if (_1.includes(_this.privilegedActors, actor)) {
                    allowAccess(true);
                }
                else {
                    allowAccess(isVisible);
                }
            });
        }
        else {
            //Show/hide from the selected role or user.
            var allowAccess = plugin.getGrantObservable(selectedActor, isVisible);
            allowAccess(isVisible);
        }
    };
    AmePluginVisibilityModule.prototype.canManagePlugins = function (actor) {
        var _this = this;
        var _ = AmePluginVisibilityModule._;
        if ((actor instanceof AmeRole) && _.has(this.canRoleManagePlugins, actor.name)) {
            return this.canRoleManagePlugins[actor.name];
        }
        if (actor instanceof AmeSuperAdmin) {
            return true;
        }
        if (actor instanceof AmeUser) {
            //Can any of the user's roles manage plugins?
            var result_1 = false;
            _.forEach(actor.roles, function (roleId) {
                if (_.get(_this.canRoleManagePlugins, roleId, false)) {
                    result_1 = true;
                    return false;
                }
            });
            return (result_1 || AmeActors.hasCap(actor.id, 'activate_plugins'));
        }
        return false;
    };
    AmePluginVisibilityModule.prototype.getGrantAccessByDefault = function (actorId) {
        if (!this.grantAccessByDefault.hasOwnProperty(actorId)) {
            this.grantAccessByDefault[actorId] = ko.observable(this.canManagePlugins(AmeActors.getActor(actorId)));
        }
        return this.grantAccessByDefault[actorId];
    };
    AmePluginVisibilityModule.prototype.getSettings = function () {
        var _ = AmePluginVisibilityModule._;
        var result = {};
        result.grantAccessByDefault = _.mapValues(this.grantAccessByDefault, function (allow) {
            return allow();
        });
        result.plugins = {};
        _.forEach(this.plugins, function (plugin) {
            result.plugins[plugin.fileName] = {
                isVisibleByDefault: plugin.isVisibleByDefault(),
                grantAccess: _.mapValues(plugin.grantAccess, function (allow) {
                    return allow();
                })
            };
            for (var i = 0; i < AmePlugin.editablePropertyNames.length; i++) {
                var key = AmePlugin.editablePropertyNames[i], upperKey = key.substring(0, 1).toUpperCase() + key.substring(1);
                result.plugins[plugin.fileName]['custom' + upperKey] = plugin.customProperties[key]();
            }
        });
        return result;
    };
    //noinspection JSUnusedGlobalSymbols Used in KO template.
    AmePluginVisibilityModule.prototype.saveChanges = function () {
        var settings = this.getSettings();
        //Remove settings associated with roles and users that no longer exist or are not visible.
        var _ = AmePluginVisibilityModule._, visibleActorIds = _.pluck(this.actorSelector.getVisibleActors(), 'id');
        _.forEach(settings.plugins, function (plugin) {
            plugin.grantAccess = _.pick(plugin.grantAccess, visibleActorIds);
        });
        //Populate form field(s).
        this.settingsData(jQuery.toJSON(settings));
        return true;
    };
    AmePluginVisibilityModule._ = wsAmeLodash;
    return AmePluginVisibilityModule;
}());
var AmePlugin = /** @class */ (function () {
    function AmePlugin(details, settings, module) {
        var _this = this;
        this.defaultProperties = {};
        this.customProperties = {};
        this.editableProperties = {};
        var _ = AmePluginVisibilityModule._;
        for (var i = 0; i < AmePlugin.editablePropertyNames.length; i++) {
            var key = AmePlugin.editablePropertyNames[i], upperKey = key.substring(0, 1).toUpperCase() + key.substring(1);
            this.defaultProperties[key] = ko.observable(_.get(details, key, ''));
            this.customProperties[key] = ko.observable(_.get(settings, 'custom' + upperKey, ''));
            this.editableProperties[key] = ko.observable(this.defaultProperties[key]());
        }
        this.name = ko.computed(function () {
            var value = _this.customProperties['name']();
            if (value === '') {
                value = _this.defaultProperties['name']();
            }
            return AmePlugin.stripAllTags(value);
        });
        this.description = ko.computed(function () {
            var value = _this.customProperties['description']();
            if (value === '') {
                value = _this.defaultProperties['description']();
            }
            return AmePlugin.stripAllTags(value);
        });
        this.fileName = details.fileName;
        this.isActive = details.isActive;
        this.isBeingEdited = ko.observable(false);
        this.isVisibleByDefault = ko.observable(_.get(settings, 'isVisibleByDefault', true));
        var emptyGrant = {};
        this.grantAccess = _.mapValues(_.get(settings, 'grantAccess', emptyGrant), function (hasAccess) {
            return ko.observable(hasAccess);
        });
        this.isChecked = ko.computed({
            read: function () {
                return module.isPluginVisible(_this);
            },
            write: function (isVisible) {
                return module.setPluginVisibility(_this, isVisible);
            }
        });
    }
    AmePlugin.prototype.getGrantObservable = function (actorId, defaultValue) {
        if (defaultValue === void 0) { defaultValue = true; }
        if (!this.grantAccess.hasOwnProperty(actorId)) {
            this.grantAccess[actorId] = ko.observable(defaultValue);
        }
        return this.grantAccess[actorId];
    };
    //noinspection JSUnusedGlobalSymbols Used in KO template.
    AmePlugin.prototype.openInlineEditor = function () {
        for (var i = 0; i < AmePlugin.editablePropertyNames.length; i++) {
            var key = AmePlugin.editablePropertyNames[i], customValue = this.customProperties[key]();
            this.editableProperties[key](customValue === '' ? this.defaultProperties[key]() : customValue);
        }
        this.isBeingEdited(true);
    };
    //noinspection JSUnusedGlobalSymbols Used in KO template.
    AmePlugin.prototype.cancelEdit = function () {
        this.isBeingEdited(false);
    };
    //noinspection JSUnusedGlobalSymbols Used in KO template.
    AmePlugin.prototype.confirmEdit = function () {
        for (var i = 0; i < AmePlugin.editablePropertyNames.length; i++) {
            var key = AmePlugin.editablePropertyNames[i], customValue = this.editableProperties[key]();
            if (customValue === this.defaultProperties[key]()) {
                customValue = '';
            }
            this.customProperties[key](customValue);
        }
        this.isBeingEdited(false);
    };
    //noinspection JSUnusedGlobalSymbols Used in KO template.
    AmePlugin.prototype.resetNameAndDescription = function () {
        for (var i = 0; i < AmePlugin.editablePropertyNames.length; i++) {
            var key = AmePlugin.editablePropertyNames[i];
            this.customProperties[key]('');
        }
        this.isBeingEdited(false);
    };
    AmePlugin.stripAllTags = function (input) {
        //Based on: http://phpjs.org/functions/strip_tags/
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '').replace(tags, '');
    };
    AmePlugin.editablePropertyNames = ['name', 'description', 'author', 'siteUrl', 'version'];
    return AmePlugin;
}());
jQuery(function ($) {
    amePluginVisibility = new AmePluginVisibilityModule(wsPluginVisibilityData);
    ko.applyBindings(amePluginVisibility, document.getElementById('ame-plugin-visibility-editor'));
    //Permanently dismiss the usage hint via AJAX.
    $('#ame-pv-usage-notice').on('click', '.notice-dismiss', function () {
        AjawV1.getAction('ws_ame_dismiss_pv_usage_notice').request();
    });
});
