(function() {

    'use strict';

    angular.module('omniseq')
        .controller('AdvanceController', AdvanceControllerFunction);

    AdvanceControllerFunction.$inject = ['$scope', '$state','uploadService','$stateParams','UserResource'];

    function AdvanceControllerFunction($scope, $state,uploadService,$stateParams,UserResource) {
        var self = this;
         var basicInfo = {'title':$stateParams.title,
                         'desc':$stateParams.desc
                        };
            //newInitiative.initiativeImage = self.initiative_photo;
        
        self.gotoNextTab = function(){
            $state.go("App.MyInitiative.AddNewInitiative.Preview",{'title':basicInfo.title ,'desc':basicInfo.desc});
        }
        self.gotoPreviousTab = function(){
            UserResource.backUnabled = true;
            $state.go("App.MyInitiative.AddNewInitiative.Basic",{'title':basicInfo.title ,'desc':basicInfo.desc});
        }
        
        
        
       $scope.$watch('file', function(newfile, oldfile) {
      if(angular.equals(newfile, oldfile) ){
        return;
      }

      uploadService.upload(newfile).then(function(res){
        // DO SOMETHING WITH THE RESULT!
        console.log("result", res);
      })
    });
    }
    
    angular.module('omniseq').service("uploadService", function($http, $q) {

    return ({
      upload: upload
    });

    function upload(file) {
      var upl = $http({
        method: 'POST',
        url: 'D:\MOJO\Extracted\MOJO\app\images', // /api/upload
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          upload: file
        },
        transformRequest: function(data, headersGetter) {
          var formData = new FormData();
          angular.forEach(data, function(value, key) {
            formData.append(key, value);
          });

          var headers = headersGetter();
          delete headers['Content-Type'];

          return formData;
        }
      });
      return upl.then(handleSuccess, handleError);

    } // End upload function

    // ---
    // PRIVATE METHODS.
    // ---
  
    function handleError(response, data) {
      if (!angular.isObject(response.data) ||!response.data.message) {
        return ($q.reject("An unknown error occurred."));
      }

      return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
      return (response);
    }

  })
    
      angular.module('omniseq').directive("fileinput", ['$rootScope',function($rootScope) {
    return {
      scope: {
        fileinput: "=",
        filepreview: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileinput);
              $rootScope.photo = scope.fileinput;
            console.log(" $rootScope.photo"+ $rootScope.photo);
            /*console.log("scope.fileinput:"+JSON.stringify(scope.fileinput));*/
        });
      }
    }
  }]);
    
    
    
    
    
    
    
    
    
}());

  