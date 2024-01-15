function getFirstDayOfLastYear () {
    const year = new Date().getFullYear() - 1;
    return `${year}-01-01`;
}

export default getFirstDayOfLastYear;
