export default {
    ADD: {
        name: 'add',
        desc: '将当前目录添加至待印队列，可选参数：[--overwrite]',
        summary: '添加',
    },
    REMOVE: {
        name: 'remove',
        alias: 'rm',
        desc: '将当前工作目录从待印队列移除',
        summary: '移除',
    },
    CLEAR: {
        name: 'clear',
        alias: 'clr',
        desc: '清空待印队列',
        summary: '清空',
    },
    PRINT: {
        name: 'print',
        alias: 'ptr',
        desc: '将待印队列中的文件打印成 markdown 文件，输出到 `User/下载/yeareport_xxx.md`，可选参数：[--pretty, --type-first, --type-only]',
        summary: '印刷'
    },
    SHOW: {
        name: 'show',
        desc: '读取待印队列中的项目列表',
        summary: '读取',
    }
};
