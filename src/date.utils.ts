export const getDayName = (date: Date): string => {
    return date.toLocaleDateString("en-IE", {weekday: "long"});
};

export const printDate = (): void => {
    const date = getCurrentDate();
    const formattedDate = formatDate(date);
    printLine(formattedDate);
};

const getCurrentDate = () => {
    return new Date();
}
const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IE");
}
const printLine = (line: string) => {
    return console.log(line);
}