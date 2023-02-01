const { curdLogger } = require('../utils/logger');

const executeRouter = async(req, res, func, send = true) => {
    try {
        let result = await func(req, res);
        if (send) res.send(result);
    } catch (ex) {
        if (ex instanceof EvalError) {
            res.status(400).send(ex);
        } else if (ex instanceof ReferenceError) {
            let error = { message : ex.message }
            res.status(406).send(error);
        } else {
            curdLogger.log("error", `action: ${req.originalUrl} error : ${ex}`);
            curdLogger.error(ex.stack);
            console.log(ex.stack);
            let error = { message : ex.message }
            res.status(500).send(error);
        }
    }
}

module.exports = executeRouter;