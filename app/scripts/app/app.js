(function () {
    var omniseq = angular.module("omniseq", ['ngAnimate', 'ui.bootstrap', 'ui.router', 'ngMessages', 'ngResource', 'common.services', 'config', 'smart-table', 'ngSanitize', 'ui.mask', 'allMock']);
    omniseq.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, $sceDelegateProvider, $qProvider) {

        $urlRouterProvider.otherwise("/login");
        $stateProvider.state('Login', {
                url: '/login',
                templateUrl: 'views/login.html',

            })
            .state('App', {
                url: '/app',
                templateUrl: 'views/master.html',

            })
            .state('App.UsersInitiative', {
                url: '/userInitiative',
                templateUrl: '/components/users/userInitiatives.html',

            })
            .state('App.MyInitiative', {
                url: '/myInitiative',
                template: '<div ui-view></div>'

            })
            .state('App.MyInitiative.AddNewInitiative', {
                url: '/addNewInitiative',
                templateUrl: '/components/users/addNewInitiative.html'

            })
            .state('App.MyInitiative.AddNewInitiative.Basic', {
                url: '/basic/:title/:desc',
                templateUrl: '/components/users/basic.html',

            })
            .state('App.MyInitiative.AddNewInitiative.Advanced', {
                url: '/advanced/:title/:desc',
                templateUrl: '/components/users/advanced.html',

            })
            .state('App.MyInitiative.AddNewInitiative.Preview', {
                url: '/preview/:title/:desc',
                templateUrl: '/components/users/preview.html',

            })
            .state('App.MyInitiative.Dashboard', {
                url: '/dashboard',
                templateUrl: '/components/users/myInitiatives.html'

            })  
            .state('App.AllInitiative', {
                url: '/allInitiative',
                templateUrl: '/components/administrator/initiatives.html',

            })
             .state('App.Users', {
                url: '/users',
                templateUrl: '/components/administrator/users.html',

            });

        $qProvider.errorOnUnhandledRejections(false);


    });


    omniseq.run(function ($rootScope) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });
    });

})();
