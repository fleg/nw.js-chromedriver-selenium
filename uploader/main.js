"use strict";

const version = "0.13.0";

const download = require("./download");
const upload = require("./upload");
const packageUpdater = require("./package-updater");

const downloads = download(version);

const uploads = downloads.then(upload);

uploads
  .then(function(uploads) {
    const upload = uploads[0];

    return packageUpdater(upload.driverVersion, upload.nwVersion, upload.driverHash);
  })
  .catch(function(err) {
    console.error(err.message);
  });