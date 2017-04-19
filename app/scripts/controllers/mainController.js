
 (function() {

    'use strict';

    angular.module('omniseq')
        .controller('MainController', MainControllerFunction);

    MainControllerFunction.$inject = ['$scope', '$state', 'authTokenFactory','authenticationFactory'];

    function MainControllerFunction($scope, $state, authTokenFactory,authenticationFactory) {
        var self = this;
        self.user = authTokenFactory.getUserDetails();
        debugger
        self.logout = function(){
            authenticationFactory.logout();
            $state.go("Login");
        }
        
        
        
        
    }
}());
