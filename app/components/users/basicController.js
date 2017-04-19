(function() {

    'use strict';

    angular.module('omniseq')
        .controller('BasicController', BasicControllerFunction);

    BasicControllerFunction.$inject = ['$scope', '$state','UserResource','$stateParams'];

    function BasicControllerFunction($scope, $state,UserResource,$stateParams) {
        var self = this;
        self.basicInfo = {};
        if(UserResource.backUnabled){
        self.basicInfo.title = $stateParams.title;
        self.basicInfo.desc = $stateParams.desc;
        }
        
        self.gotoNextTab = function(){
            $state.go("App.MyInitiative.AddNewInitiative.Advanced", {'title':self.basicInfo.title ,'desc':self.basicInfo.desc });
        }
    }
}());