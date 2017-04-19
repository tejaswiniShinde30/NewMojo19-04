(function () {

    'use strict';

    angular.module('omniseq')
        .controller('initiativesController', initiativesController);

    initiativesController.$inject = ['$scope', '$state','UserResource','API', 'CONFIG'];

    function initiativesController($scope, $state, UserResource, API, CONFIG) {

        var initiativesCtrl = this;
        initiativesCtrl.displayed = [];
        initiativesCtrl.callServer = callServer;


        function callServer(tableState) {
            initiativesCtrl.stState = tableState;
            initiativesCtrl.isLoading = true;
            initiativesCtrl.noRecords = false;
            var pagination = tableState.pagination;
            var start = pagination.start || 0;
            var number = pagination.number || 10;

            UserResource.getPage(start, number, tableState).then(function (result) {
                initiativesCtrl.displayed = result.data;
                if (initiativesCtrl.displayed.length) {
                    tableState.pagination.numberOfPages = result.numberOfPages;
                    initiativesCtrl.isLoading = false;
                } else {
                    initiativesCtrl.noRecords = true;
                    initiativesCtrl.isLoading = false;
                }
            });
        }
        
        initiativesCtrl.deleteInitiative  = function(id){
       UserResource.deleteInitiative(id).then(function (result) {
            });
       
       }
        
        
        

    }
}());
