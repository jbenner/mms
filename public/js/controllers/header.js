'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Media',
        'link': 'mediaFiles'
    },
    {
        'title': 'Add new media file',
        'link': 'mediaFiles/create'
    }];

    $scope.isCollapsed = false;
}]);
