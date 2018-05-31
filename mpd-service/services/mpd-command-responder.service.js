const cote = require('cote')({environment: 'mqm'});
const Responder = cote.Responder;

module.exports = new Responder({
    name: 'mqm-mpd-command-responder',
    namespace: 'mpd-service'
});