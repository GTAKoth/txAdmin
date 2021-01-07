//Requires
const modulename = 'WebServer:apiStart';
const { dir, log, logOk, logWarn, logError } = require('../../extras/console')(modulename);

const config = require('../../../config')


/**
 * Handle all the server control actions
 * @param {object} ctx
 */
module.exports = async function apiStart(ctx) {
    const action = ctx.params.action;

    //Check permissions
    if(!config.tokens.includes(ctx.request.body.xAuth)){
        return ctx.send({
            type: 'danger',
            message: `You don't have permission to execute this action.`
        });
    }

    if(globals.fxRunner.fxChild !== null){
        globals.fxRunner.restartServer('CONSOLE');
        return ctx.send({type: 'danger', message: 'The server is already running. Forced restart request sent!'});
    }

    ctx.utils.logCommand(`START SERVER`);
    const spawnMsg = await globals.fxRunner.spawnServer(true);
    if(spawnMsg !== null){
        return ctx.send({type: 'danger', message: spawnMsg});
    }else{
        return ctx.send({type: 'success', message: 'Starting server...'});
    }

};


