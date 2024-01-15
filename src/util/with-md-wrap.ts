function withMdWrap (msg: string) {
    return `${msg || ''}

`;
}

export default withMdWrap;
