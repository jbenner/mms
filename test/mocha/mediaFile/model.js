'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    MediaFile = mongoose.model('MediaFile');

//Globals
var user;
var mediaFile;

//The tests
describe('<Unit Test>', function() {
    describe('Model MediaFile:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                mediaFile = new MediaFile({
                    title: 'MediaFile Title',
                    content: 'MediaFile Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return mediaFile.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                mediaFile.title = '';

                return mediaFile.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            MediaFile.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            MediaFile.remove().exec();
            User.remove().exec();
            done();
        });
    });
});
