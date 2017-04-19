(function() {

    'use strict';

    angular.module('omniseq')
        .controller('PreviewController', PreviewControllerFunction);

    PreviewControllerFunction.$inject = ['$scope', '$state','$stateParams','MyInititivesResource'];

    function PreviewControllerFunction($scope, $state,$stateParams,MyInititivesResource) {
        var self = this;
        self.newInitiative = {};
        self.newInitiative.title = $stateParams.title;
        self.newInitiative.desc = $stateParams.desc;
        self.newInitiative.img = "";
        
        self.cancel = function(){
            $state.go("App.MyInitiative.Dashboard");
        };
        self.share = function(){
            debugger
           MyInititivesResource.addNewInitiative(self.newInitiative).then(function (result) {
               
                 $state.go("App.MyInitiative.Dashboard");
            });
           
        };
         self.gotoPreviousTab = function(){
            $state.go("App.MyInitiative.AddNewInitiative.Advanced",{'title':$stateParams.title ,'desc':$stateParams.desc});
        }
    }
}());