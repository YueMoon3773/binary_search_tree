const binaryTree = require('./binaryTree');
const prettyPrint = require('./prettyPrint');

let levelOrderArr = [];
let inOrderArr = [];
let preOrderArr = [];
let postOrderArr = [];

const printAllOrders = () => {
    if (levelOrderArr.length > 0) console.log(`Level order (level base): ${levelOrderArr}`);

    if (inOrderArr.length > 0) console.log(`In order (depth left => root => right): ${inOrderArr}`);

    if (preOrderArr.length > 0) console.log(`Pre order (depth root => left => right): ${preOrderArr}`);

    if (postOrderArr.length > 0) console.log(`Post order (depth left => right => root =>): ${postOrderArr}`);
};

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 63, 45, 35, 24];
// const testArr = [1, 7, 4, 23, 8, 9];
const tree = binaryTree(testArr);

tree.levelOrder((node) => levelOrderArr.push(node.data));
tree.inOrder((node) => inOrderArr.push(node.data), tree.getTreeRoot(), inOrderArr);
tree.preOrder((node) => preOrderArr.push(node.data), tree.getTreeRoot(), preOrderArr);
tree.postOrder((node) => postOrderArr.push(node.data), tree.getTreeRoot(), postOrderArr);
// printAllOrders();

tree.insertItem(10);
// console.log(tree.getTreeRoot());

// tree.prettyPrint();
// prettyPrint(tree.getTreeRoot());
// tree.removeItem(23);
// tree.findItem(24, true);

tree.height(8);
// tree.depth(23);

// console.log(tree.getTreeRoot());
prettyPrint(tree.getTreeRoot());
