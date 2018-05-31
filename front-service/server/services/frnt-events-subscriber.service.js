const cote = require('cote')({environment: 'mqm'});

const subscriber = new cote.Subscriber({
    name: 'mqm-frnt-events-subscriber'
});

module.exports = subscriber;