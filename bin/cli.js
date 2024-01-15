#!/usr/bin/env node
import fs from 'node:fs';
import process from 'node:process';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import confirm from '@inquirer/confirm';
import ora from 'ora';

import bot, { operator } from '../src/index.js';

const program = yargs(hideBin(process.argv));

const spinner = ora({ text: '', color: 'cyan' });

const noop = () => {};

const getCommander = op => [op.name, op.alias].filter(Boolean);

program
    .scriptName('yeareport')
    .usage('$0 <command> [options]')
    .command(getCommander(operator.ADD), operator.ADD.desc, noop, run(operator.ADD.name))
    .command(getCommander(operator.REMOVE), operator.REMOVE.desc, noop, run(operator.REMOVE.name))
    .command(getCommander(operator.CLEAR), operator.CLEAR.desc, noop, run(operator.CLEAR.name))
    .command(getCommander(operator.PRINT), operator.PRINT.desc, noop, run(operator.PRINT.name))
    .command(getCommander(operator.SHOW), operator.SHOW.desc, noop, run(operator.SHOW.name))
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
    .options('overwrite', {
        alias: 'o',
        type: 'boolean',
        desc: '待 add 的项目日志已存在时进行覆写操作',
        boolean: true,
        default: false,
    })
    .options('output', {
        type: 'string',
        desc: 'print 命令的输出目录，相对于当前工作目录，默认`User/Downloads`',
    })
    .options('pretty', {
        alias: 'p',
        type: 'boolean',
        desc: '使用 emoji 美化 print 的提交类型标题',
        boolean: true,
        default: false,
    })
    .options('type-first', {
        type: 'boolean',
        desc: '使用提交类型分组的 print 方式而非项目分组，优先级大于 --type-only',
        boolean: true,
        default: false,
    })
    .options('type-only', {
        type: 'string',
        desc: '传入此参数则只 print 该类型的工作内容，优先级小于 --type-first',
    })
    .demandCommand()
    .strictCommands()
    .example('$0 add -n yourname', '输出 `yourname` 的 commit 提交日志，默认 git config global 的 user.name')
    .example('$0 add -d 2024-01-01', '输出 `2024-01-01` 到今天的全部日志，默认 last_year-01-01')
    .example('$0 add -o', '如果待印队列中已存在当前工作目录的项目，程序将根据 `--overwrite` 参数决定抛出异常/覆写')
    .example('$0 print -p', '当存在此项，二级标题将输出：## {commit-type-emoji} {commit-type}')
    .example('$0 print --type-first', '最终 markdown 输出以 `项目 > 提交类型 > 列表` 分节')
    .example('$0 print --type-first', '最终 markdown 输出以 `提交类型 > 项目 > 列表` 分节，不兼容 --type-only 参数')
    .example('$0 print --type-only', '最终 markdown 仅输出匹配类型的 commit 且以 `项目 > 列表` 分节，不兼容 `--pretty` 参数')
    .example('$0 add -n zhangzixin -d 2023-01-28 && $0 ptr -p --type-first', '输出`zhangzixin`从`2023-01-28`到今天的提交日志为markdown且以`提交类型 > 项目 > 列表`分节到`User/Downloads`目录')
    .help().alias('h', 'help')
    .version().alias('v', 'version')
    .parse();

function run (type, middleware) {
    return async (argv) => {
        spinner.start(`${operator[type.toUpperCase()].summary}中...`);
        const params = middleware ? middleware(argv) : argv;
        await bot({ type, ...params }).then(resolver(type)).catch(catcher(type));
    };
}

function resolver (type) {
    return (args) => {
        switch (type) {
            case operator.SHOW.name:
                spinner.succeed(`${operator[type.toUpperCase()].summary}完成`);
                log(args);
                break;
            default:
                spinner.succeed(`${operator[type.toUpperCase()].summary}完成`);
                break;
        }
    }
}

function catcher (type) {
    return err => {
        spinner.fail(`${operator[type.toUpperCase()].summary}失败`);
        log([undefined, `${err}`]);
        process.exit(1);
    };
}

function log (ls) {
    if (!ls) return;
    if (!Array.isArray(ls))
        ls = [ls];

    for (const val of ls) {
        console.log(val || '');
    }
}
