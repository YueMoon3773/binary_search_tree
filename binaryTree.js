const mergeSort = require('./mergeSort');
const node = require('./node');

const prepareArray = (arr) => {
    //sort the inp arr
    const sortedArr = arr.sort((a, b) => a - b);
    // console.log({ sortedArr });

    let retArr = [];
    // remove duplicated items
    sortedArr.forEach((item) => {
        if (!retArr.includes(item)) {
            retArr.push(item);
        }
    });

    return retArr;
};

const binaryTree = (arr) => {
    const sortedArr = prepareArray(arr);
    // const sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    // console.log({ sortedArr });

    const buildTree = (arr) => {
        //base case: no array
        if (arr.length === 0) {
            return null;
        } else {
            const mid = Math.floor(arr.length / 2);

            const newNode = node(arr[mid]);

            const leftSubTree = buildTree(arr.slice(0, mid));
            const rightSubTree = buildTree(arr.slice(mid + 1));

            newNode.left = leftSubTree;
            newNode.right = rightSubTree;
            return newNode;
        }
    };
    let root = buildTree(sortedArr);

    const getTreeRoot = () => root;

    const insertItem = (value, currentNode = root) => {
        if (!value || value === null) {
            throw new Error('No value to insert');
        }
        //if there is no current node, create one with data = value
        if (currentNode === null) {
            return node(value);
        }

        //recursion
        //base case: if the node with input value already exist, return
        if (currentNode.data === value) {
            return;
        } else {
            if (value < currentNode.data) {
                currentNode.left = insertItem(value, currentNode.left);
            } else {
                currentNode.right = insertItem(value, currentNode.right);
            }
            return currentNode;
        }
    };

    const removeItem = (value, currentNode = root) => {
        if (!value || value === null) {
            throw new Error('No value to remove');
        }

        //base case:
        if (currentNode === null) {
            return currentNode;
        } else {
            //if the inp val is bigger than the node data
            // => the node has that value is in the right sub tree
            if (currentNode.data < value) {
                currentNode.right = removeItem(value, currentNode.right);
            }
            //if the inp val is smaller than the node data
            // => the node has that value is in the left sub tree
            else if (currentNode.data > value) {
                currentNode.left = removeItem(value, currentNode.left);
            }
            //if the inp val is equal to the node data
            // => need to check if the node child
            // 1. if no child (node is leaf) => can delete it without affecting the tree
            // 2. if one child
            //      + link the parent of the current node to its child and delete current node.
            // 3. if two child
            //      + go to the right child (*) of the current node
            //      + go all way to the bottom left (node leaf left node) of the right child (*) // get above
            //      + set the bottom left data to the current node data
            //      + delete the bottom left node
            else {
                // Case 1:
                if (!currentNode.left && !currentNode.right) {
                    currentNode = null;
                    return currentNode;
                }
                // Case 3:
                else if (currentNode.left && currentNode.right) {
                    let bottomLeftNode = currentNode.right;

                    while (bottomLeftNode.left !== null) {
                        bottomLeftNode = bottomLeftNode.left;
                    }
                    // console.log(bottomLeftNode);
                    currentNode.data = bottomLeftNode.data;
                    bottomLeftNode = null;
                }
                // Case 2:
                else {
                    let replacementNode;
                    if (currentNode.right) {
                        replacementNode = currentNode.right;
                    } else if (currentNode.left) {
                        replacementNode = currentNode.left;
                    }

                    currentNode = null;
                    return replacementNode;
                }
            }
            return currentNode;
        }
    };

    const findItem = (value, printLog = false) => {
        if (!value || value === null) {
            throw new Error('No value to find');
        } else {
            let currentNode = getTreeRoot();

            while (currentNode && currentNode.data !== value) {
                currentNode = currentNode.data < value ? currentNode.right : currentNode.left;
            }

            if (currentNode && printLog) console.log(`Node with ${value} is `, currentNode);

            return currentNode && currentNode.data === value ? currentNode : null;
        }
    };

    const levelOrder = (callbackFn, levelOrderArr = []) => {
        if (!callbackFn) {
            throw new Error('Callback function for levelOrder not found');
        }
        const queue = [getTreeRoot()];

        while (queue.length > 0) {
            const currentNode = queue.shift();

            callbackFn ? callbackFn(currentNode) : levelOrderArr.push(currentNode.data);

            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    };

    const inOrder = (callbackFn, currentNode = null, inOrderArr = []) => {
        if (!callbackFn) {
            throw new Error('Callback function for inOrder not found');
        }

        // Base case:
        if (!currentNode) {
            return null;
        }
        // recursion to left subtree => root => right subtree
        else {
            inOrder(callbackFn, currentNode.left, inOrderArr);
            callbackFn ? callbackFn(currentNode) : inOrderArr.push(currentNode.data);
            inOrder(callbackFn, currentNode.right, inOrderArr);
        }
    };

    const preOrder = (callbackFn, currentNode = null, preOrderArr = []) => {
        if (!callbackFn) {
            throw new Error('Callback function for preOrder not found');
        }

        // Base case:
        if (!currentNode) {
            return null;
        }
        // recursion to root => left subtree => right subtree
        else {
            callbackFn ? callbackFn(currentNode) : preOrderArr.push(currentNode.data);
            preOrder(callbackFn, currentNode.left, preOrderArr);
            preOrder(callbackFn, currentNode.right, preOrderArr);
        }
    };

    const postOrder = (callbackFn, currentNode = null, postOrderArr = []) => {
        if (!callbackFn) {
            throw new Error('Callback function for postOrder not found');
        }

        // Base case:
        if (!currentNode) {
            return null;
        }
        // recursion to left subtree => right subtree => root
        else {
            callbackFn ? callbackFn(currentNode) : postOrderArr.push(currentNode.data);
            postOrder(callbackFn, currentNode.left, postOrderArr);
            postOrder(callbackFn, currentNode.right, postOrderArr);
        }
    };

    const height = (value) => {
        if (!value || value === null) {
            throw new Error('No value to calculate height');
        } else if (findItem(value)) {
            let itemHeight = 0;
            let leftSubTreeHeight = 0;
            let rightSubTreeHeight = 0;

            const targetNode = findItem(value);
            let currentNode = findItem(value);

            while (currentNode.left) {
                leftSubTreeHeight += 1;
                currentNode = currentNode.left;
            }
            while (currentNode.right) {
                rightSubTreeHeight += 1;
                currentNode = currentNode.right;
            }

            itemHeight =
                targetNode.data !== getTreeRoot().data
                    ? Math.max(leftSubTreeHeight, rightSubTreeHeight)
                    : Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
            console.log(`Height from root to node "${value}" is: ${itemHeight}`);
            return itemHeight;
        } else {
            return null;
        }
    };

    const depth = (value) => {
        if (!value || value === null) {
            throw new Error('No value to calculate depth');
        } else if (findItem(value)) {
            let itemDepth = 0;
            let currentNode = getTreeRoot();

            while (currentNode && currentNode.data !== value) {
                itemDepth += 1;
                currentNode = currentNode.data < value ? currentNode.right : currentNode.left;
            }
            console.log(`Depth from root to node "${value}" is: ${itemDepth}`);

            return itemDepth;
        } else {
            return null;
        }
    };

    const prettyPrint = (node = root, prefix = '', isLeft = true) => {
        if (node.right) {
            prettyPrint(node.right, `${prefix}${isLeft ? '|   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left) {
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '|   '}`, true);
        }
    };

    return {
        getTreeRoot,
        insertItem,
        removeItem,
        findItem,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        prettyPrint,
    };
};

module.exports = binaryTree;
