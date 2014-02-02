(function(){
    'use strict';

    //profiles service used for profiles REST endpoint
    angular.module('mean.profiles').factory('profiles', ['$resource', function($resource) {
        return $resource('profiles/:profileId', {
            profileId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
})();
