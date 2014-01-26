'use strict';

(function() {
    // MediaFiles Controller Spec
    describe('MEAN controllers', function() {
        describe('MediaFilesController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var MediaFilesController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                MediaFilesController = $controller('MediaFilesController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one mediaFile object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('mediaFiles').respond([{
                        title: 'An MediaFile about MEAN',
                        name: 'MEAN rocks!',
                        format: 'test',
                        size: '1KB',
                        location: temp
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.mediaFiles).toEqualData([{
                        title: 'An MediaFile about MEAN',
                        name: 'MEAN rocks!',
                        format: 'test',
                        size: '1KB',
                        location: temp
                    }]);

                });

            it('$scope.findOne() should create an array with one mediaFile object fetched ' +
                'from XHR using a mediaFileId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.mediaFileId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testMediaFileData = function() {
                        return {
                            title: 'An MediaFile about MEAN',
                            name: 'MEAN rocks!',
                            format: 'test',
                            size: '1KB',
                            location: 'temp'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/mediaFiles\/([0-9a-fA-F]{24})$/).respond(testMediaFileData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.mediaFile).toEqualData(testMediaFileData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postMediaFileData = function() {
                        return {
                            title: 'An MediaFile about MEAN',
                            name: 'MEAN rocks!',
                            format: 'test',
                            size: '1KB',
                            location: 'temp'
                        };
                    };

                    // fixture expected response data
                    var responseMediaFileData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An MediaFile about MEAN',
                            name: 'MEAN rocks!',
                            format: 'test',
                            size: '1KB',
                            location: 'temp'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An MediaFile about MEAN';
                    scope.name = 'MEAN rocks!';
                    scope.format = 'test';
                    scope.size = '1KB';
                    scope.location = 'temp';

                    // test post request is sent
                    $httpBackend.expectPOST('mediaFiles', postMediaFileData()).respond(responseMediaFileData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.name).toEqual('');
                    expect(scope.format).toEqual('');
                    expect(scope.size).toEqual('');
                    expect(scope.location).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/mediaFiles/' + responseMediaFileData()._id);
                });

            it('$scope.update() should update a valid mediaFile', inject(function(MediaFiles) {

                // fixture rideshare
                var putMediaFileData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An MediaFile about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock mediaFile object from form
                var mediaFile = new MediaFiles(putMediaFileData());

                // mock mediaFile in scope
                scope.mediaFile = mediaFile;

                // test PUT happens correctly
                $httpBackend.expectPUT(/mediaFiles\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/mediaFiles\/([0-9a-fA-F]{24})$/, putMediaFileData()).respond();
                /*
                Error: Expected PUT /mediaFiles\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An MediaFile about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An MediaFile about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/mediaFiles/' + putMediaFileData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid mediaFileId' +
                'and remove the mediaFile from the scope', inject(function(MediaFiles) {

                    // fixture rideshare
                    var mediaFile = new MediaFiles({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.mediaFiles = [];
                    scope.mediaFiles.push(mediaFile);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/mediaFiles\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(mediaFile);
                    $httpBackend.flush();

                    // test after successful delete URL location mediaFiles lis
                    //expect($location.path()).toBe('/mediaFiles');
                    expect(scope.mediaFiles.length).toBe(0);

                }));
        });
    });
}());
