const cote = require('cote');
const Responder = cote.Responder;

module.exports = new Responder({
    name: 'mqm-database-responder',
    namespace: 'database-commands'
});