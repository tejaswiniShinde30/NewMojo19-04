(function () {

    'use strict';

    angular.module('omniseq')
        .controller('userInitiativesController', userInitiativesController);

    userInitiativesController.$inject = ['$scope', '$state', 'UserResource', 'API', 'CONFIG', '$http'];

    function userInitiativesController($scope, $state, UserResource, API, CONFIG, $http) {
        self.tracker = false;

        var userInitiativesCtrl = this;
        userInitiativesCtrl.displayed = [];
        userInitiativesCtrl.callServer = callServer;


        function callServer(tableState) {
            userInitiativesCtrl.stState = tableState;
            userInitiativesCtrl.isLoading = true;
            userInitiativesCtrl.noRecords = false;
            var pagination = tableState.pagination;
            var start = pagination.start || 0;
            var number = pagination.number || 10;

            UserResource.getPage(start, number, tableState).then(function (result) {
                userInitiativesCtrl.displayed = result.data;
                if (userInitiativesCtrl.displayed.length) {
                    tableState.pagination.numberOfPages = result.numberOfPages;
                    userInitiativesCtrl.isLoading = false;
                } else {
                    userInitiativesCtrl.noRecords = true;
                    userInitiativesCtrl.isLoading = false;
                }
            });
        }
        
        self.followTracker = function() {
            self.tracker = true;
        };
        
        
        

    }

}());
