module.exports = {
    CMD_TITLE_COMMAND_ADD: 'Add',
    CMD_TITLE_COMMAND_REMOVE: 'Remove',
    CMD_TITLE_COMMAND_CLEAR: 'Clear',
    CMD_TITLE_COMMAND_PRINT: 'Analyze',
    CMD_TITLE_COMMAND_SHOW: 'Read',

    CMD_STATUS_SUCCESS: 'Completed',
    CMD_STATUS_ERROR: 'Failed',

    CMD_DES_COMMAND_ADD: 'Add the current directory to the queue',
    CMD_DES_COMMAND_REMOVE: 'Remove the current working directory from the queue',
    CMD_DES_COMMAND_CLEAR: 'Clear the queue',
    CMD_DES_COMMAND_PRINT: 'Output the queue as a markdown file',
    CMD_DES_COMMAND_SHOW: 'Show the list of logs in the queue',

    CMD_DES_OPTION_AUTHOR: 'When `auto`, look up from git global config, default to output all logs',
    CMD_DES_OPTION_SINCE: `Start outputting from a certain date, default to \`${new Date().getFullYear() - 1}-01-01\``,
    CMD_DES_OPTION_BEFORE: `End outputting on a certain date, default to \`${new Date().getFullYear()}-01-01\``,
    CMD_DES_OPTION_OUTPUT: 'print output directory, relative to the current working directory, default `User/Downloads`',
    CMD_DES_OPTION_OVERWRITE: 'add overwrite authorization, perform overwrite operation when the current working directory already exists',
    CMD_DES_OPTION_PRETTY: 'print beautify the title, use emoji to beautify Markdown titles',

    CMD_DES_EXAMPLE_OVERWRITE: 'Authorize the add command to overwrite when logs of the current working directory are already in the queue',
    CMD_DES_EXAMPLE_AUTHOR: 'Only add logs of author kabeep to the queue',
    CMD_DES_EXAMPLE_SINCE_BEFORE: 'Add logs from 2023-01-01 to 2024-01-01 to the queue',
    CMD_DES_EXAMPLE_PRETTY: 'Markdown titles will output `# {emoji} {commit-type}`',
}
