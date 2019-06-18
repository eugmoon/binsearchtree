class NODE {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.next = null;
        this.previous = null;
    }

    insert(node, newValue) {
        if (newValue < node.value) {
            if (node.left != null) {
                this.insert(node.left, newValue);
            }
            else {
                node.left = new NODE(newValue);
            }
        }
        else if (newValue > node.value) {
            if (node.right != null) {
                this.insert(node.right, newValue);
            }
            else {
                node.right = new NODE(newValue);
            }
        }
        else {
            ;
        }
    }

    printBinTree(node) {
        if (node != null) {
            console.log(node.value);
            this.printBinTree(node.left);
            this.printBinTree(node.right);
        }
        else {
            console.log("-1");
        }
    }

    delete(rootNode, value) {
        console.log("Delete node with value: " + value);

        if (value != rootNode.value) {
            var parentNode = this.findParentNode(rootNode, value);

            if (parentNode != null) {
                var currentNode = null;
                if (value < parentNode.value) {
                    currentNode = parentNode.left;
    
                    if (currentNode.left == null) {
                        parentNode.left = currentNode.right;
                    }
                    else if (currentNode.right == null) {
                        parentNode.left = currentNode.left;
                    }
                    else {      // currentNode has two children
                        var replaceNode = this.findMaxNode(currentNode.left);
                        currentNode.value = replaceNode.value;
                        if (replaceNode == currentNode.left) {
                            currentNode.left = null;
                        }
                        else {
                            this.findParentNode(currentNode.left, replaceNode.value).right = null;
                        }
                    }
                }
                else if (value > parentNode.value) {
                    currentNode = parentNode.right;
    
                    if (currentNode.left == null) {
                        parentNode.right = currentNode.right;
                    }
                    else if (currentNode.right == null) {
                        parentNode.right = currentNode.left;
                    }
                    else {      // currentNode has two children
                        var replaceNode = this.findMinNode(currentNode.right);
                        currentNode.value = replaceNode.value;
                        if (replaceNode == currentNode.right) {
                            currentNode.right = null;
                        }
                        else {
                            this.findParentNode(currentNode.right, replaceNode.value).left = null;
                        }
                    }
                }
            }
        }
        else {      // delete root node
            var replaceNode = this.findMaxNode(rootNode.left);
            replaceNode.left = rootNode.left;
            replaceNode.right = rootNode.right;
            if (replaceNode.value == rootNode.left.value) {
                replaceNode.left = null;
            }
            else {
                this.findParentNode(rootNode.left, replaceNode.value).right = null;
            }
            return replaceNode;
        }

        return rootNode;
    }

    findParentNode(rootNode, value) {
        console.log("Find parent of node with value: " + value);
        var currentNode = rootNode;
        var nodeStack = new STACK();

        while (currentNode != null) {
            if (value != rootNode.value) {
                if (value < currentNode.value) {
                    nodeStack.push(currentNode);
                    currentNode = currentNode.left;
                }
                else if (value > currentNode.value) {
                    nodeStack.push(currentNode);
                    currentNode = currentNode.right;
                }
                else {      // value == currentNode.value
                    currentNode = nodeStack.pop();
                    break;
                }
            }
            else {      // value == rootNode.value
                console.log("Value is " + rootNode.value);
                return rootNode;
            }
        }

        if (currentNode != null) {
            console.log("Value is " + currentNode.value);
        }

        return currentNode;
    }

    findMinNode(treeNode) {
        console.log("Find min tree node");
        var currentNode = treeNode;

        while (currentNode.left != null) {
            currentNode = currentNode.left;
        }
        console.log("Found: " + currentNode.value);

        return currentNode;
    }

    findMaxNode(treeNode) {
        console.log("Find max tree node");
        var currentNode = treeNode;

        while (currentNode.right != null) {
            currentNode = currentNode.right;
        }
        console.log("Found: " + currentNode.value);

        return currentNode;
    }

    findTreeNode(treeNode, value) {
        var currentNode = null;

        if (treeNode != null) {
            if (treeNode.value != value) {      // value not equal initial node value
                var parentNode = this.findParentNode(treeNode, value);

                if (parentNode != null) {       // found parent node
                    if (value < parentNode.value) {
                        currentNode = parentNode.left;
                    }
                    else if (value > parentNode.value) {
                        currentNode = parentNode.right;
                    }
                    else {      // value equal tree root node value
                        currentNode = parentNode;
                    }
                }
                else {      // parent node not found
                    return parentNode;
                }
            }
            else {      // value equal initial node value
                currentNode = treeNode;
            }
        }
        else {      // treeNode empty
            currentNode = null;
        }

        return currentNode;
    }

    serialize(nodeQueue, rootNode) {
        var serialQueue = nodeQueue;
        var serialNode = null;

        if (rootNode != null) {     // rootNode not empty
            serialNode = new NODE(rootNode.value);
            serialQueue.enqueue(serialNode);
            this.serialize(serialQueue, rootNode.left);
            this.serialize(serialQueue, rootNode.right);
        }
        else {      // rootNode is empty (null)
            serialNode = new NODE(-1);
            serialQueue.enqueue(serialNode);
        }

        return serialQueue;
    }

    deserialize(nodeQueue) {
        var serialQueue = nodeQueue;
        var serialNode = null;

        if (nodeQueue != null) {    // nodeQueue not empty
            serialNode = serialQueue.dequeue();

            if (serialNode.value != -1) {   // nodeQueue first node not -1
                serialNode.left = this.deserialize(serialQueue);
                serialNode.right = this.deserialize(serialQueue);
            }
            else {      // nodeQueue first node has value -1 (empty sentinel)
                serialNode = null;
            }
        }
        else {      // nodeQueue is empty
            serialNode = null;
        }
        
        return serialNode;
    }
}

class STACK {
    constructor() {
        this.root = null;
    }

    push(node) {
        if (node != null) {
            node.next = this.root;
            this.root = node;
        }
    }

    pop() {
        var popNode = this.root;

        if (popNode != null) {
            if (popNode.next != null) {
                this.root = popNode.next;
            }
            else {
                this.root = null;
            }
        }

        return popNode;
    }

    peek() {
        var peekNode = this.root;

        if (peekNode != null) {
            return peekNode.value;
        }

        return "Stack is empty!";
    }
}

class QUEUE {
    constructor() {
        this.front = null;
        this.end = null;
    }

    enqueue(node) {
        if (node != null) {
            if (this.end != null) {
                node.previous = this.end;
                this.end.next = node;
                this.end = node;
            }
            else {
                this.end = node;
                this.front = node;
            }
        }
    }

    dequeue() {
        var frontNode = this.front;

        if (frontNode != null) {
            if (frontNode.next != null) {
                var tempNode = frontNode.next;
                tempNode.previous = null;
                this.front = tempNode;
            }
            else {
                frontNode = this.front;
                this.front = null;
                this.end = null;
            }
        }
        else {
            return "Queue is empty!";
        }

        return frontNode;
    }

    printQueue() {
        var currentNode = this.front;

        while (currentNode != null) {
            console.log(currentNode.value);
            currentNode = currentNode.next;
        }
        console.log("");
    }
}

var root = new NODE(20);
root.insert(root, 8);
root.insert(root, 22);
root.insert(root, 20);      // insert repeated
root.insert(root, 4);
root.insert(root, 12);
root.insert(root, 5);
root.insert(root, 8);       // insert repeated
root.insert(root, 10);
root.insert(root, 14);
root.insert(root, 22);      // insert repeated

root.printBinTree(root);
console.log("");

root = root.delete(root, 20);

root.printBinTree(root);
console.log("");

if (root.findTreeNode(root, 29) != null) {
    console.log("Success!\n");
} else {
    console.log("Failed!\n");
}

if (root.findTreeNode(root, 5) != null) {
    console.log("Success!\n");
} else {
    console.log("Failed!\n");
}

if (root.findParentNode(root, 20)!= null) {
    console.log("Success!\n");
} else {
    console.log("Failed!\n");
}

if (root.findParentNode(root, 14)!= null) {
    console.log("Success!\n");
} else {
    console.log("Failed!\n");
}
console.log("");

var treeQueue = new QUEUE();
treeQueue = root.serialize(treeQueue, root);

treeQueue.printQueue();

var treeNode = root.deserialize(treeQueue);
treeNode.printBinTree(treeNode);
console.log("");
