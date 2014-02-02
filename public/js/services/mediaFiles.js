(function(){
    'use strict';

    //mediaFiles service used for mediaFiles REST endpoint
    angular.module('mean.mediaFiles').factory('mediaFiles', ['$resource', function($resource) {
        return $resource('mediaFiles/:mediaFileId', {
            mediaFileId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
})();
