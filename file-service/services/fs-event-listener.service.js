const cote = require('cote')({environment: 'mqm'});
const subscriber = new cote.Subscriber({ name: 'mqm-file-service-event-listener' });