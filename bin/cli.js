#!/usr/bin/env node
const process = require('node:process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const Spinner = require('cli-spinner').Spinner;

const locale = require('./locale/locale.js');
const logSymbols = require('./util/log-symbols.js');
const yeareport = require('../lib/index.js');

const program = yargs(hideBin(process.argv));

const spinner = new Spinner('%s ');
spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
spinner.setSpinnerDelay(80);

program
    .scriptName('yeareport')
    .usage('$0 <command> [options]')
    .command('add', locale.CMD_DES_COMMAND_ADD, {}, run('add'))
    .command(['remove', 'rm'], locale.CMD_DES_COMMAND_REMOVE, {}, run('remove'))
    .command(['clear', 'clr'], locale.CMD_DES_COMMAND_CLEAR, {}, run('clear'))
    .command(['print', 'ptr'], locale.CMD_DES_COMMAND_PRINT, {}, run('print'))
    .command('show', locale.CMD_DES_COMMAND_SHOW, {}, run('show'))
    .option('author', { type: 'string', desc: locale.CMD_DES_OPTION_AUTHOR })
    .option('since', { type: 'string', desc: locale.CMD_DES_OPTION_SINCE })
    .option('before', { type: 'string', desc: locale.CMD_DES_OPTION_BEFORE })
    .option('output', { type: 'string', desc: locale.CMD_DES_OPTION_OUTPUT })
    .option('overwrite', {
        alias: 'o',
        type: 'boolean',
        desc: locale.CMD_DES_OPTION_OVERWRITE,
        boolean: true,
        default: false,
    })
    .option('pretty', {
        alias: 'p',
        type: 'boolean',
        desc: locale.CMD_DES_OPTION_PRETTY,
        boolean: true,
        default: false,
    })
    .demandCommand()
    .strictCommands()
    .example('$0 add -o', locale.CMD_DES_EXAMPLE_OVERWRITE)
    .example('$0 add --author=kabeep', locale.CMD_DES_EXAMPLE_AUTHOR)
    .example('$0 add --since=2023-01-01 --before=2024-01-01', locale.CMD_DES_EXAMPLE_SINCE_BEFORE)
    .example('$0 print -p', locale.CMD_DES_EXAMPLE_PRETTY)
    .help().alias('h', 'help')
    .version().alias('v', 'version')
    .parse();

function run (type) {
    return async (argv) => {
        start(type);
        await yeareport({ type, ...argv }).then(resolver(type)).catch(catcher(type));
    };
}

function resolver (type) {
    return async (args) => {
        switch (type) {
            case 'show':
                done(type, args);
                console.log();

                for (let index = 0; index < (args?.length || 0); index++) {
                    console.log(`> ${args[index]}`);
                }
                break;
            default:
                done(type);
                break;
        }
    };
}

function catcher (type) {
    return err => {
        done(type, false);
        console.log();
        console.log(`${err}`);
        process.exit(1);
    };
}

function start (type) {
    spinner.setSpinnerTitle(`${locale.CMD_STATUS_PENDING} ${getActionLabel(type)}...`);
    spinner.start();

    cursor(true);
}

function done (type, status = true) {
    spinner.clearLine(process.stderr);
    spinner.stop();

    cursor(true);

    const label = getActionLabel(type);
    console.log(`${logSymbols[status ? 'success' : 'error']} ${label} ${status ? locale.CMD_STATUS_SUCCESS : locale.CMD_STATUS_ERROR}`);
}

function cursor (visible = false) {
    if (!process.stderr.isTTY) return;

    process.stderr.write(visible ? '\u001B[?25h' : '\u001B[?25l');
}

function getActionLabel (type) {
    switch (type) {
        case 'add':
            return locale.CMD_TITLE_COMMAND_ADD;
        case 'remove':
            return locale.CMD_TITLE_COMMAND_REMOVE;
        case 'clear':
            return locale.CMD_TITLE_COMMAND_CLEAR;
        case 'print':
            return locale.CMD_TITLE_COMMAND_PRINT;
        case 'show':
            return locale.CMD_TITLE_COMMAND_SHOW;
    }
}
