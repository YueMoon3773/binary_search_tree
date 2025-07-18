const prettyPrint = (rootNode, prefix = '', isLeft = true) => {
    // if (rootNode === null) {
    //     return;
    // }
    if (rootNode.right) {
        prettyPrint(rootNode.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${rootNode.data}`);
    if (rootNode.left) {
        prettyPrint(rootNode.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

module.exports = prettyPrint;
