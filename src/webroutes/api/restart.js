//Requires
const modulename = 'WebServer:apiRestart';
const { dir, log, logOk, logWarn, logError } = require('../../extras/console')(modulename);

const config = require('../../../config')


/**
 * Handle all the server control actions
 * @param {object} ctx
 */
module.exports = async function apiRestart(ctx) {
    const action = ctx.params.action;

    //Check permissions
    if(!config.tokens.includes(ctx.request.body.xAuth)){
        return ctx.send({
            type: 'danger',
            message: `You don't have permission to execute this action.`
        });
    }

    ctx.utils.logCommand(`RESTART SERVER`);
    if(globals.fxRunner.restartDelayOverride || globals.fxRunner.restartDelayOverride <= 4000){
        globals.fxRunner.restartServer('CONSOLE');
        return ctx.send({type: 'success', message: `Restarting the fxserver with delay override ${globals.fxRunner.restartDelayOverride}.`});
    }else{
        const restartMsg = await globals.fxRunner.restartServer('CONSOLE');
        if(restartMsg !== null){
            return ctx.send({type: 'danger', message: restartMsg});
        }else{
            return ctx.send({type: 'success', message: 'Restarting server...'});
        }
    }
};
