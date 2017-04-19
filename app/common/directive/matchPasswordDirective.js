(function() {
    'use strict';
    var commonServices = angular.module("common.services");
    var directiveId = 'ngMatch';
    commonServices.directive(directiveId, ['$parse', function($parse) {
        var directive = {
            link: link,
            restrict: 'A',
            require: '?ngModel',
            scope: {
                flag: '=flag',
                matchingString: '=ngMatch',
            }
        };
        return directive;

        function link(scope, elem, attrs, ctrl) {
            // if ngModel is not defined, we don't need to do anything
            if (!ctrl) return;
            if (!attrs[directiveId]) return;
            var firstPassword = $parse(attrs[directiveId]);
          //  console.log("attrs"+attrs);
            var validator = function(value) {
                //var temp = firstPassword(scope);
                if (scope.flag) {
                   var v = value === scope.matchingString;
                    ctrl.$setValidity('match', v);
                  } else {
                  var v1 = value !== scope.matchingString;
                    ctrl.$setValidity('unmatch', v1);
                  }

                return value;
            };
            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);
            attrs.$observe(directiveId, function() {
                validator(ctrl.$viewValue);
            });

        }
    }]);

})();
