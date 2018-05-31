const cote = require('cote')({environment: 'mqm'});

module.exports = new cote.Responder({
    name: 'mqm-fs-command-responder',
    namespace: 'file-service'
});