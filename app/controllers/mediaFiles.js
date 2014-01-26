'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    MediaFile = mongoose.model('MediaFile'),
    _ = require('lodash');


/**
 * Find mediaFile by id
 */
exports.mediaFile = function(req, res, next, id) {
    MediaFile.load(id, function(err, mediaFile) {
        if (err) return next(err);
        if (!mediaFile) return next(new Error('Failed to load mediaFile ' + id));
        req.mediaFile = mediaFile;
        next();
    });
};

/**
 * Create a mediaFile
 */
exports.create = function(req, res) {
    var mediaFile = new MediaFile(req.body);
    mediaFile.user = req.user;

    mediaFile.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                mediaFile: mediaFile
            });
        } else {
            res.jsonp(mediaFile);
        }
    });
};

/**
 * Update a mediaFile
 */
exports.update = function(req, res) {
    var mediaFile = req.mediaFile;

    mediaFile = _.extend(mediaFile, req.body);

    mediaFile.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                mediaFile: mediaFile
            });
        } else {
            res.jsonp(mediaFile);
        }
    });
};

/**
 * Delete an mediaFile
 */
exports.destroy = function(req, res) {
    var mediaFile = req.mediaFile;

    mediaFile.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                mediaFile: mediaFile
            });
        } else {
            res.jsonp(mediaFile);
        }
    });
};

/**
 * Show an mediaFile
 */
exports.show = function(req, res) {
    res.jsonp(req.mediaFile);
};

/**
 * List of mediaFiles
 */
exports.all = function(req, res) {
    MediaFile.find().sort('-created').populate('user', 'name username').exec(function(err, mediaFiles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(mediaFiles);
        }
    });
};
