/**
 * Return a node object
 * @param {*} data
 * @param {null|Node} left
 * @param {null|Node} right
 * @returns
 */

const node = (data, left = null, right = null) => {
    return {
        data,
        left,
        right,
    };
};

module.exports = node;
