const cote = require('cote');
const Responder = cote.Responder;

module.exports = new Responder({
    name: 'mqm-mpd-command-responder',
    namespace: 'mpd-commands'
});