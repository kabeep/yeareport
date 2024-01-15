const logType = ['initial', 'feat', 'to', 'refactor', 'perf', 'enhance', 'fix', 'test', 'style', 'chore', 'update', 'bump', 'ci', 'build', 'docs'] as const;

export type LogType = typeof logType[number];

export default logType;
