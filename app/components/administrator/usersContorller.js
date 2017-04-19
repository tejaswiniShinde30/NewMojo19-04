(function () {

    'use strict';

    angular.module('omniseq')
        .controller('usersController', usersController);

    usersController.$inject = ['$scope', '$state', 'allUsersResource', 'API', 'CONFIG', '$http'];

    function usersController($scope, $state, allUsersResource, API, CONFIG, $http) {
        self.tracker = false;

        var usersCtrl = this;
        usersCtrl.displayed = [];
        usersCtrl.callServer = callServer;


        function callServer(tableState) {
            usersCtrl.stState = tableState;
            usersCtrl.isLoading = true;
            usersCtrl.noRecords = false;
            var pagination = tableState.pagination;
            var start = pagination.start || 0;
            var number = pagination.number || 10;

            allUsersResource.getUsers().then(function (result) {
                usersCtrl.displayed = result.data;
                if (usersCtrl.displayed.length) {
                    tableState.pagination.numberOfPages = result.numberOfPages;
                    usersCtrl.isLoading = false;
                } else {
                    usersCtrl.noRecords = true;
                    usersCtrl.isLoading = false;
                }
            });
        }
        
        
        self.followTracker = function() {
            self.tracker = true;
        };
        
        
        

    }

}());
