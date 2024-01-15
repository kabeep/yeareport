#!/usr/bin/env node
const process = require('node:process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const Spinner = require('cli-spinner').Spinner;

const logSymbols = require('./util/log-symbols.js');
const yeareport = require('../lib/index.js');

const program = yargs(hideBin(process.argv));

const spinner = new Spinner('%s ');
spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
spinner.setSpinnerDelay(80);
spinner.start();

program
    .scriptName('yeareport')
    .usage('$0 <command> [options]')
    .command('add', '将当前目录添加至待印队列，可选参数：[--username, --date, --overwrite]', {}, run('add'))
    .command(['remove', 'rm'], '将当前工作目录从待印队列移除', {}, run('remove'))
    .command(['clear', 'clr'], '清空待印队列', {}, run('clear'))
    .command(
        ['print', 'ptr'],
        '将待印队列中的文件打印成 markdown 文件，输出到 `User/下载/yeareport_xxx.md`，可选参数：[--pretty, --type-first, --type-only]',
        {},
        run('print'),
    )
    .command('show', '读取待印队列中的项目列表', {}, run('show'))
    .options('username', {
        alias: 'n',
        type: 'array',
        desc: '[git commit] 使用的用户名， 默认为 `git config --global username`',
        array: true,
    })
    .options('date', {
        alias: 'd',
        type: 'string',
        desc: '[git log] 的 `--since` 参数，默认为上一年的 `01-01`',
    })
    .options('output', {
        type: 'string',
        desc: 'print 命令的输出目录，相对于当前工作目录，默认`User/Downloads`',
    })
    .options('overwrite', {
        alias: 'o',
        type: 'boolean',
        desc: '待 add 的项目日志已存在时进行覆写操作',
        boolean: true,
        default: false,
    })
    .options('pretty', {
        alias: 'p',
        type: 'boolean',
        desc: '使用 emoji 美化 print 的提交类型标题',
        boolean: true,
        default: false,
    })
    .demandCommand()
    .strictCommands()
    .example('$0 add -n yourname', '输出 `yourname` 的 commit 提交日志，默认 git config global 的 user.name')
    .example('$0 add -d 2024-01-01', '输出 `2024-01-01` 到今天的全部日志，默认 last_year-01-01')
    .example('$0 add -o', '如果待印队列中已存在当前工作目录的项目，程序将根据 `--overwrite` 参数决定抛出异常/覆写')
    .example('$0 print -p', '当存在此项，二级标题将输出：## {emoji} {commit-type}')
    .help().alias('h', 'help')
    .version().alias('v', 'version')
    .parse();

function run (type) {
    return async (argv) => {
        start();
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

function start () {
    spinner.setSpinnerTitle('test');

    cursor(true);
}

function done (type, status = true) {
    spinner.clearLine(process.stderr);
    spinner.stop();

    cursor(true);

    const label = getActionLabel(type);
    console.log(`${logSymbols[status ? 'success' : 'error']} ${label} ${status ? '成功' : '失败'}`);
}

function cursor (visible = false) {
    if (!process.stderr.isTTY) return;

    process.stderr.write(visible ? '\u001B[?25h' : '\u001B[?25l');
}

function getActionLabel (type) {
    switch (type) {
        case 'add':
            return '添加';
        case 'remove':
            return '移除';
        case 'clear':
            return '清空';
        case 'print':
            return '分析';
        case 'show':
            return '读取';
    }
}
