(function(){
    'use strict';

    //Setting up route
    angular.module('mean').config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/mediaFiles', {
                templateUrl: 'views/mediaFiles/list.html'
            }).
            when('/mediaFiles/create', {
                templateUrl: 'views/mediaFiles/create.html'
            }).
            when('/mediaFiles/:mediaFileId/edit', {
                templateUrl: 'views/mediaFiles/edit.html'
            }).
            when('/mediaFiles/:mediaFileId', {
                templateUrl: 'views/mediaFiles/view.html'
            }).
            when('/profiles', {
                templateUrl: 'views/profiles/list.html'
            }).
            when('/profiles/create', {
                templateUrl: 'views/profiles/create.html'
            }).
            when('/profiles/:profileId/media/list', {
                templateUrl: 'views/profiles/media/list.html'
            }).
            when('/profiles/:profileId/edit', {
                templateUrl: 'views/profiles/edit.html'
            }).
            when('/profiles/:profileId/remove', {
                templateUrl: 'views/profiles/remove.html'
            }).
            when('/profiles/:profileId', {
                templateUrl: 'views/profiles/view.html'
            }).
            when('/', {
                templateUrl: 'views/index.html'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);

    //Setting HTML5 Location Mode
    angular.module('mean').config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);
})();
