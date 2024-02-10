export const normalizeValues = (values) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
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