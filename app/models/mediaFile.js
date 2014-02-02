(function(){
    'use strict';

    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;


    /**
     * MediaFile Schema
     */
    var MediaFileSchema = new Schema({
        created: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        title: {
            type: String,
            default: '',
            trim: true
        },
        format: {
            type: String,
            default: '',
            trim: true
        },
        size: {
            type: String,
            default: '',
            trim: true
        },
        location: {
            type: String,
            default: '',
            trim: true
        }
    });

    /**
     * Validations
     */
    MediaFileSchema.path('title').validate(function(title) {
        return title.length;
    }, 'Title cannot be blank');

    /**
     * Statics
     */
    MediaFileSchema.statics.load = function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    };

    mongoose.model('MediaFile', MediaFileSchema);
})();
