`use strict`;

const FS = require(`fs`);

class DataHandler {
    constructor() { }

    static renderDom(path, contentType, callback, encoding) {
        FS.readFile(path, encoding ? encoding : `utf-8`, (error, string) => {
            callback(error, string, contentType);
        });
    }

    static getKey() {
        return FS.readFileSync(`data/encryption/key.pem`);
    }

    static getCert() {
        return FS.readFileSync(`data/encryption/cert.pem`);
    }
}

module.exports = DataHandler;