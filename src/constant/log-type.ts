const logType = [
    'initial',
    'feat',
    'to',
    'refactor',
    'perf',
    'enhance',
    'fix',
    'test',
    'style',
    'chore',
    'update',
    'add',
    'bump',
    'ci',
    'build',
    'docs',
] as const;

export type LogType = (typeof logType)[number] | 'misc';

export default logType;
