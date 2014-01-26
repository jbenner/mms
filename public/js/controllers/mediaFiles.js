'use strict';

angular.module('mean.mediaFiles').controller('MediaFilesController', ['$scope', '$routeParams', '$location', 'Global', 'mediaFiles', function ($scope, $routeParams, $location, Global, mediaFiles) {
    $scope.global = Global;

    $scope.create = function() {
        var mediaFile = new mediaFiles({
            title: this.title,
            name: this.name,
            format: this.format,
            size: this.size,
            location: this.location
        });
        mediaFile.$save(function(response) {
            $location.path('mediaFiles/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(mediaFile) {
        if (mediaFile) {
            mediaFile.$remove();

            for (var i in $scope.mediaFiles) {
                if ($scope.mediaFiles[i] === mediaFile) {
                    $scope.mediaFiles.splice(i, 1);
                }
            }
        }
        else {
            $scope.mediaFile.$remove();
            $location.path('mediaFiles');
        }
    };

    $scope.update = function() {
        var mediaFile = $scope.mediaFile;
        if (!mediaFile.updated) {
            mediaFile.updated = [];
        }
        mediaFile.updated.push(new Date().getTime());

        mediaFile.$update(function() {
            $location.path('mediaFiles/' + mediaFile._id);
        });
    };

    $scope.find = function() {
        mediaFiles.query(function(mediaFiles) {
            $scope.mediaFiles = mediaFiles;
        });
    };

    $scope.findOne = function() {
        mediaFiles.get({
            mediaFileId: $routeParams.mediaFileId
        }, function(mediaFile) {
            $scope.mediaFile = mediaFile;
        });
    };
}]);
