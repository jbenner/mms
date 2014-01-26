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
        }).        when('/', {
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
