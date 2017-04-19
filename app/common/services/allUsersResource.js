(function() {
    angular.module('common.services')
        .factory('allUsersResource', ['$resource','CONFIG', allUsersResourceFunc]);

    function allUsersResourceFunc($resource, CONFIG) {
        return $resource(CONFIG.url.base + CONFIG.url.users, {}, {
            getUsers: {
                method: 'GET'
            }
        });
    }
}());
