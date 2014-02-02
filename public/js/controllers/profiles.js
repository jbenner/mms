(function(){
    'use strict';

    angular.module('mean.profiles').controller('ProfilesController', ['$scope', '$routeParams', '$location', 'Global', 'profiles', function ($scope, $routeParams, $location, Global, profiles) {
        $scope.global = Global;

        $scope.create = function() {
            var profile = new profiles({
                title: this.title,
                paths: this.paths,
                active: this.active
            });
            profile.$save(function(response) {
                $location.path('profiles/' + response._id);
            });

            this.title = '';
            this.paths = '';
            this.active = false;
        };

        $scope.remove = function(profile) {
            if (profile) {
                profile.$remove();

                for (var i in $scope.profiles) {
                    if ($scope.profiles[i] === profile) {
                        $scope.profiles.splice(i, 1);
                    }
                }
            }
            else {
                $scope.profile.$remove();
                $location.path('profiles');
            }
        };

        $scope.update = function() {
            var profile = $scope.profile;

            if (!profile.updated) {
                profile.updated = [];
            }
            profile.updated.push(new Date().getTime());
            profile.media = ['one', 'two', 'three'];

            profile.$update(function() {
                $location.path('profiles/' + profile._id);
            });
        };

        $scope.find = function() {
            profiles.query(function(profiles) {
                $scope.profiles = profiles;
            });
        };

        $scope.findOne = function() {
            profiles.get({
                profileId: $routeParams.profileId
            }, function(profile) {
                $scope.profile = profile;
            });
        };
    }]);
})();
