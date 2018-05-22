const cote = require('cote')({environment: 'mqm'});

const responder = new cote.Responder({
    name: 'mqm-mpd-commands-responder',
    namespace: 'mpd-service'
});

module.exports = () => {
    responder.on();
};