export function pagination({ input, itemsPerPage }) {
    let result = [];
    let temp = [];

    input.forEach((item, i) => {
        if ((i !== 0 & i % itemsPerPage === 0)) {
            result.push(temp);
            temp = [item];
        } else {
            temp.push(item)
        }
    })

    if (result.length < Math.ceil(input.length / itemsPerPage)) {
        result.push(temp);
    }
    
    return result;

}