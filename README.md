MEAN Media Server
=================

A simple HTTP media server built on the MEAN stack. The basic requirements of the project include:
* Build an index of media files in a nested directory structure, with basic file information including:
  * name
  * format
  * size
  * location
  * media metadata
* Watch for new files or changes to existing files and update the index accordingly
* Authenticate users and provide access only to authorized media
* Provide a visually appealing user interface for browsing media, with cover art and additional information provided by external APIs where possible
* Offer persistent media playback capabilities while navigating between views

Get up and running
------------------

More information pertaining to the installation and build process can be found in MEAN_README.md, and at http://mean.io/

*This build requires [Node.js](http://nodejs.org/), [Bower](http://bower.io/), and a local [MongoDB](http://www.mongodb.org/) server.*

Clone the repository. Ensure that a local MongoDB daemon is running. Enter the following commands in a terminal from the project directory:

    npm install
    grunt
