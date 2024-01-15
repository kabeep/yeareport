module.exports = {
    CMD_TITLE_COMMAND_ADD: '追加',
    CMD_TITLE_COMMAND_REMOVE: '削除',
    CMD_TITLE_COMMAND_CLEAR: 'クリア',
    CMD_TITLE_COMMAND_PRINT: '分析',
    CMD_TITLE_COMMAND_SHOW: '読み込み',

    CMD_STATUS_SUCCESS: '完了',
    CMD_STATUS_ERROR: '失敗',

    CMD_DES_COMMAND_ADD: '現在のディレクトリをキューに追加',
    CMD_DES_COMMAND_REMOVE: '現在の作業ディレクトリをキューから削除',
    CMD_DES_COMMAND_CLEAR: 'キューをクリア',
    CMD_DES_COMMAND_PRINT: 'キューをマークダウンファイルとして出力',
    CMD_DES_COMMAND_SHOW: 'キュー内のログリストを表示',

    CMD_DES_OPTION_AUTHOR: '`auto`の場合、git global configから検索、デフォルトはすべてのログを出力',
    CMD_DES_OPTION_SINCE: `特定の日から出力開始、デフォルトは \`${new Date().getFullYear() - 1}-01-01\``,
    CMD_DES_OPTION_BEFORE: `特定の日まで出力終了、デフォルトは \`${new Date().getFullYear()}-01-01\``,
    CMD_DES_OPTION_OUTPUT: 'print 出力ディレクトリ、現在の作業ディレクトリに対して相対的、デフォルトは `User/Downloads`',
    CMD_DES_OPTION_OVERWRITE: 'add 上書き許可、現在の作業ディレクトリが既に存在する場合に上書き操作を実行',
    CMD_DES_OPTION_PRETTY: 'print タイトルを美化、emojiを使ってMarkdownのタイトルを美化',

    CMD_DES_EXAMPLE_OVERWRITE: '現在の作業ディレクトリのログがキュー内に既にある場合に上書きするためのaddコマンドの承認',
    CMD_DES_EXAMPLE_AUTHOR: '著者kabeepのログのみをキューに追加',
    CMD_DES_EXAMPLE_SINCE_BEFORE: '2023-01-01から2024-01-01までのログをキューに追加',
    CMD_DES_EXAMPLE_PRETTY: 'Markdownのタイトルは `# {emoji} {commit-type}` として出力されます',
}
