//Requires
const modulename = 'WebServer:apiStop';
const { dir, log, logOk, logWarn, logError } = require('../../extras/console')(modulename);

const config = require('../../../config')


/**
 * Handle all the server control actions
 * @param {object} ctx
 */
module.exports = async function apiStop(ctx) {
    const action = ctx.params.action;

    //Check permissions
    if(!config.tokens.includes(ctx.request.body.xAuth)){
        return ctx.send({
            type: 'danger',
            message: `You don't have permission to execute this action.`
        });
    }

    if(globals.fxRunner.fxChild === null){
        return ctx.send({type: 'danger', message: 'The server is already stopped.'});
    }

    ctx.utils.logCommand(`STOP SERVER`);
    await globals.fxRunner.killServer("CONSOLE");
    return ctx.send({type: 'warning', message: 'Server stopped.'});
};
