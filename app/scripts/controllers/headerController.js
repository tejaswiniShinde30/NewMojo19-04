
 (function() {

    'use strict';

    angular.module('omniseq')
        .controller('headerController', HerderControllerFunction);

    HerderControllerFunction.$inject = ['$scope', '$state','authenticationFactory','libFactory'];

    function HerderControllerFunction($scope,$state,authenticationFactory,libFactory) {
                debugger
                var self = this;
      
$(function() {
// Setup drop down menu
$('.dropdown-toggle').dropdown();

// Fix input element click problem
$('.dropdown input, .dropdown-menu label').click(function(e) {
e.stopPropagation();
});
});
                function login() {
                    
                }
        }
}());
