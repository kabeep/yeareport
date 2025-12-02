import type { LogType } from '../constant';
import { logType } from '../constant';

export type LogLineRecord = {
    date: string;
    month: string;
    type: LogType;
    desc: string;
    text: string;
};

function getLogLineRecord(content: string, appendType: string[]): LogLineRecord | undefined {
    if (!content) {
        return;
    }

    const text = content.trim();
    const match = /^((\d{4}-\d{2})-\d{2})(.*)/.exec(text);
    const [_, date, month, title] = match || [];

    if (!title || !date) {
        return;
    }

    // TODO: match scope and make regex to safety
    const regular = new RegExp(`^(${[...appendType, ...logType].join('|')}):?(.*)`, 'i');
    const descMatch = title.trim().match(regular);
    const type = descMatch?.[1]?.toLowerCase() as LogType | undefined;
    const desc = descMatch?.[2]?.trim();

    if (!type || !desc) {
        return;
    }

    return { date, month, type, desc, text };
}

export default getLogLineRecord;
