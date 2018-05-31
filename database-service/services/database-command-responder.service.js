const cote = require('cote')({environment: 'mqm'});
const Responder = cote.Responder;

module.exports = new Responder({
    name: 'mqm-database-commands-responder',
    namespace: 'database-service'
});