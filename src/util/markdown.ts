type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

class Markdown {
    private content: string;

    constructor(content = '') {
        this.content = content;
    }

    title(level: TitleLevel, content = '', prefix: string | boolean | undefined = '') {
        this.content += this.withLine(`${this.createTitleSign(level)} ${this.withPrefix(content, prefix)}`);
        return this;
    }

    blockquotes(contents: string | string[] = '') {
        if (!Array.isArray(contents)) {
            contents = [contents];
        }

        for (let index = 0; index < contents.length; index++) {
            const isLatest = index === contents.length - 1;
            this.content += this.withLine(contents[index], isLatest ? '' : '>');
        }

        return this;
    }

    list(contents: string | string[] = '') {
        if (!Array.isArray(contents)) {
            contents = [contents];
        } else if (contents.length === 0) {
            return this;
        }

        for (const content of contents) {
            this.content += this.withLine(`- ${content}`);
        }

        return this;
    }

    value() {
        return this.content;
    }

    private withLine(content = '', prefix = '') {
        return `${content}
${prefix}
`;
    }

    private withPrefix(content = '', prefix: string | boolean | undefined = '') {
        return `${prefix ? `${prefix} ` : ''}${content}`;
    }

    private createTitleSign(level: TitleLevel) {
        return new Array(level).fill('#').join('');
    }
}

export default Markdown;
