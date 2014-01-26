'use strict';

// mediaFiles routes use mediaFiles controller
var mediaFiles = require('../controllers/mediaFiles');
var authorization = require('./middlewares/authorization');

// mediaFile authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.mediaFile.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/mediaFiles', mediaFiles.all);
    app.post('/mediaFiles', authorization.requiresLogin, mediaFiles.create);
    app.get('/mediaFiles/:mediaFileId', mediaFiles.show);
    app.put('/mediaFiles/:mediaFileId', authorization.requiresLogin, hasAuthorization, mediaFiles.update);
    app.del('/mediaFiles/:mediaFileId', authorization.requiresLogin, hasAuthorization, mediaFiles.destroy);

    // Finish with setting up the mediaFileId param
    app.param('mediaFileId', mediaFiles.mediaFile);

};
