(function(){
    'use strict';

    angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.mediaFiles', 'mean.profiles']);

    angular.module('mean.system', []);
    angular.module('mean.mediaFiles', []);
    angular.module('mean.profiles', []);
})();
