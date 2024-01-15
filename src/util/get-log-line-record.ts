import type { LogType } from '../constant';
import { logType } from '../constant';

export type LogLineRecord = {
    date: string;
    month: string;
    type: LogType;
    desc: string;
    text: string;
}

function getLogLineRecord (content: string): LogLineRecord | null {
    if (!content) return null;

    const text = content.trim();
    const match = text.match(/^((\d{4}-\d{2})-\d{2})(.*)/);
    const [_, date, month, title] = match || [];

    if (!title || !date) return null;

    const regular = new RegExp(`^(${logType.join('|')}):?(.*)`, 'i');
    const descMatch = title.trim().match(regular);
    const type = descMatch?.[1]?.toLowerCase() as LogType | undefined;
    const desc = descMatch?.[2]?.trim();

    if (!type || !desc) return null;

    return { date, month, type, desc, text };
}

export default getLogLineRecord;
