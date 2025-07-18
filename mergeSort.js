/**
 * Use recursion to sort arr
 * @param {array} arr
 * @returns sorted array
 */
const mergeSort = (arr = []) => {
    if (arr.length === 0) {
        return;
    } else if (arr.length === 1) {
        return arr;
    } else {
        // console.log({ arr });

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        return merge(mergeSort(left), mergeSort(right));
    }
};

/**
 * Merge two arrays together
 * @param {array} left
 * @param {array} right
 * @returns
 */
function merge(left, right) {
    let list = [];

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            // add left item into merged arr
            list.push(left[0]);
            // remove left[0] from left
            left.shift();
        } else {
            // add right item into merged arr
            list.push(right[0]);
            // remove right[0] from right
            right.shift();
        }
    }

    while (right.length > 0) {
        list.push(right[0]);
        right.shift();
    }

    while (left.length > 0) {
        list.push(left[0]);
        left.shift();
    }

    // console.log({ list });

    return list;
}

module.exports = mergeSort;
