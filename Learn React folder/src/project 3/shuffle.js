export function shuffle(arr) {
    let data = [...arr]
    for (let i = data.length - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1));
        [data[i], data[newIndex]] = [data[newIndex], data[i]];
    }
    
    return data
}