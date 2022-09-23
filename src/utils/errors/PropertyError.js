class PropertyError extends Error {
    constructor(propName, message) {
        super(message);
        this.propName = propName;
    }
}

module.exports = PropertyError;