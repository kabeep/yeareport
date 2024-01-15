module.exports = {
    CMD_TITLE_COMMAND_ADD: '添加',
    CMD_TITLE_COMMAND_REMOVE: '移除',
    CMD_TITLE_COMMAND_CLEAR: '清空',
    CMD_TITLE_COMMAND_PRINT: '分析',
    CMD_TITLE_COMMAND_SHOW: '读取',

    CMD_STATUS_SUCCESS: '完成',
    CMD_STATUS_ERROR: '失败',

    CMD_DES_COMMAND_ADD: '将当前目录添加至队列',
    CMD_DES_COMMAND_REMOVE: '将当前工作目录从队列中移除',
    CMD_DES_COMMAND_CLEAR: '清空队列',
    CMD_DES_COMMAND_PRINT: '将队列输出为 markdown 文件',
    CMD_DES_COMMAND_SHOW: '显示队列中的日志列表',

    CMD_DES_OPTION_AUTHOR: '为 `auto` 时从 git global config 中查找，默认全部输出日志',
    CMD_DES_OPTION_SINCE: `从某日开始输出，默认为 \`${new Date().getFullYear() - 1}-01-01\``,
    CMD_DES_OPTION_BEFORE: `输出到某日结束，默认为 \`${new Date().getFullYear()}-01-01\``,
    CMD_DES_OPTION_OUTPUT: 'print 输出目录，相对于当前工作目录，默认 `User/Downloads`',
    CMD_DES_OPTION_OVERWRITE: 'add 覆写授权，当前工作目录已存在时进行覆写操作',
    CMD_DES_OPTION_PRETTY: 'print 美化标题，使用 emoji 美化 Markdown 标题',

    CMD_DES_EXAMPLE_OVERWRITE: '授权 add 命令当前工作目录的日志已在队列中时进行覆写',
    CMD_DES_EXAMPLE_AUTHOR: '仅将作者 kabeep 的日志添加到队列',
    CMD_DES_EXAMPLE_SINCE_BEFORE: '将 2023-01-01 到 2024-01-01 的日志添加到队列',
    CMD_DES_EXAMPLE_PRETTY: 'Markdown 标题将输出 `# {emoji} {commit-type}`',
}
