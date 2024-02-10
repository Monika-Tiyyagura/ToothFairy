export const normalizeValues = (values) => {
    console.log("Type of input", typeof values[0])
    const max = Math.max(...values);
    const min = Math.min(...values);
    console.log("max & min values", max, min);
    return values.map(value => ((value - min) / (max - min)) * 10);
};

// Function to average values by dividing the dataset into 8 equal parts
export const averageParts = (values) => {
    const partSize = Math.ceil(values.length / 8);
    const averages = [];

    for (let i = 0; i < values.length; i += partSize) {
        const part = values.slice(i, i + partSize);
        const avg = part.reduce((acc, val) => acc + val, 0) / part.length;
        averages.push(avg);
    }

    return averages;
};

export function customRound(number) {
    return number - Math.floor(number) < 0.5 ? Math.floor(number) : Math.ceil(number);
}

export const dateTimeArray = (epochMillisecondsArray) => {
    return epochMillisecondsArray.map(epoch => {
    const date = new Date(epoch/1000000);
    return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
});
}