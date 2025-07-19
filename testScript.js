const binaryTree = require('./binaryTree');
const arrayHandler = require('./arrayHandler');
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

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 63, 45, 35, 24];
testArr = arrayHandler().createArray(20);

const tree = binaryTree(testArr);

console.log('initial tree:');
prettyPrint(tree.getTreeRoot());

tree.levelOrder((node) => levelOrderArr.push(node.data));
tree.inOrder((node) => inOrderArr.push(node.data), tree.getTreeRoot(), inOrderArr);
tree.preOrder((node) => preOrderArr.push(node.data), tree.getTreeRoot(), preOrderArr);
tree.postOrder((node) => postOrderArr.push(node.data), tree.getTreeRoot(), postOrderArr);
printAllOrders();

tree.insertItem(1);
tree.insertItem(6);
tree.insertItem(600);
tree.insertItem(900);
tree.insertItem(500);
tree.insertItem(999);
tree.insertItem(990);

console.log('tree after ADDING value:');
prettyPrint(tree.getTreeRoot());

tree.removeItem(500);
tree.removeItem(990);
tree.removeItem(1);

console.log('tree after REMOVING value:');
prettyPrint(tree.getTreeRoot());

tree.findItem(600, true);
tree.findItem(999, true);

tree.height(45);
tree.depth(23);

tree.isBalanced();

// console.log(tree.getTreeRoot());
console.log('tree BEFORE balanced');
prettyPrint(tree.getTreeRoot());

tree.reBalance();
console.log('tree AFTER balanced');
prettyPrint(tree.getTreeRoot());
