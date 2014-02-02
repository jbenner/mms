(function(){
    'use strict';

    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;


    /**
     * Profile Schema
     */
    var ProfileSchema = new Schema({
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
        paths: {
            type: String,
            default: '',
            trim: true
        },
        active: {
            type: Boolean,
            default: false
        },
        media: {
            type: Array,
            default: []
        }
    });

    /**
     * Validations
     */
    ProfileSchema.path('title').validate(function(title) {
        return title.length;
    }, 'Title cannot be blank');

    ProfileSchema.path('paths').validate(function(paths) {
        return paths.length;
    }, 'Paths cannot be blank');

    /**
     * Statics
     */
    ProfileSchema.statics.load = function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    };

    mongoose.model('Profile', ProfileSchema);
})();
