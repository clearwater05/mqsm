const cote = require('cote')({environment: 'mqm'});
const publisher = new cote.Publisher(
    {
        name: 'mqm-fs-log-publisher'
    }
);

module.exports = {
    /**
     *
     * @return {*}
     */
    getPuplisher() {
        return publisher;
    }
};