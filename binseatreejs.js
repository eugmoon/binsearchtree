class NODE {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
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

    inOrderIterate(node) {
        var currNode = node;
        var stack = new STACK();

        do {
            while (currNode != null) {
                stack.push(currNode);
                if (currNode.left == null)
                    console.log("N");   // left Null
                currNode = currNode.left;
            }

            if (!stack.isEmpty()) {
                currNode = stack.pop();
                console.log(currNode.value);
                if (currNode.right == null)
                    console.log("N");   // right Null
                currNode = currNode.right;
            }
        } while (currNode != null || !stack.isEmpty())
    }

    postOrderIterate(node) {
        var currNode = node;
        var prevNode = null;
        var stack = new STACK();

        do {
            while (currNode != null) {
                stack.push(currNode);
                if (currNode.left == null)
                    console.log("N");   // left Null
                currNode = currNode.left;
            }

            if (currNode == null && !stack.isEmpty()) {
                currNode = stack.pop();
                if (currNode.right == null || currNode.right == prevNode) {
                    if (currNode.right == null)
                        console.log("N");   // right Null
                    console.log(currNode.value);
                    prevNode = currNode;
                    currNode = null;
                }
                else {
                    stack.push(currNode);
                    currNode = currNode.right;
                }
            }
        } while (!stack.isEmpty())
    }

    preOrderIterate(node) {
        var currNode = node;
        var stack = new STACK();

        do {
            while (currNode != null) {
                stack.push(currNode);
                console.log(currNode.value);
                if (currNode.left == null)
                    console.log("N");  // left Null
                currNode = currNode.left
            }

            if (!stack.isEmpty()) {
                currNode = stack.pop();
                if (currNode.right == null)
                    console.log("N");  // right Null
                currNode = currNode.right;
            }
        } while (currNode != null || !stack.isEmpty())
    }

    recurseTree(node, order) {
        if (node != null) {
            if (order == "in") {
                this.recurseTree(node.left, order);
                console.log(node.value);
                this.recurseTree(node.right, order);
            }
            else if (order == "post") {
                this.recurseTree(node.left, order);
                this.recurseTree(node.right, order);
                console.log(node.value);
            }
            else if (order == "pre") {
                console.log(node.value);
                this.recurseTree(node.left, order);
                this.recurseTree(node.right, order);
            }
        }
        else {
            console.log("N");
        }
    }

    delete(rootNode, value) {
        console.log("Delete node with value: " + value + "\n");

        if (rootNode != null) {
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
                var replaceNode = null;
    
                if (rootNode.left != null) {
                    replaceNode = this.findMaxNode(rootNode.left);
                    if (replaceNode.value != rootNode.left.value) {
                        this.findParentNode(rootNode.left, replaceNode.value).right = null;
                        replaceNode.left = rootNode.left;
                    }
                    replaceNode.right = rootNode.right;
                }
                else if (rootNode.right != null) {
                    replaceNode = this.findMaxNode(rootNode.right);
                    if (replaceNode.value == rootNode.right.value) {
                        this.findParentNode(rootNode.right, replaceNode.value).left = null;
                        replaceNode.left = rootNode.left;
                    }
                    replaceNode.left = rootNode.left;
                }
    
                return replaceNode;
            }
        }

        return rootNode;
    }

    findParentNode(rootNode, value) {
        console.log("Find parent of node with value: " + value + "\n");
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
                console.log("Value is " + rootNode.value + "\n");
                return rootNode;
            }
        }

        if (currentNode != null) {
            console.log("Value is " + currentNode.value + "\n");
        }

        return currentNode;
    }

    findMinNode(treeNode) {
        console.log("Find min tree node\n");
        var currentNode = treeNode;

        while (currentNode.left != null) {
            currentNode = currentNode.left;
        }
        console.log("Found: " + currentNode.value + "\n");

        return currentNode;
    }

    findMaxNode(treeNode) {
        console.log("Find max tree node\n");
        var currentNode = treeNode;

        while (currentNode.right != null) {
            currentNode = currentNode.right;
        }
        console.log("Found: " + currentNode.value + "\n");

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
}

class STAQ {
    constructor(node) {
        this.node = node;
        this.next = null;
        this.previous = null;
    }
}

class STACK {
    constructor() {
        this.top = null;
    }

    push(node) {
        var stackNode = new STAQ(node);
        // stackNode.next = null;
        if (this.top != null) {
            stackNode.next = this.top;
        }
        this.top = stackNode;
    }

    pop() {
        var stackNode = this.top;

        if (stackNode != null) {
            if (stackNode.next != null) {
                this.top = stackNode.next;
            }
            else {
                this.top = null;
            }
        }

        return stackNode.node;
    }

    peek() {
        var stackNode = this.top;

        if (stackNode != null)
            return stackNode.node;

        return stackNode;
    }

    isEmpty() {
        return (this.peek() == null);
    }
}

class QUEUE {
    constructor() {
        this.front = null;
        this.back = null;
    }

    enqueue(node) {
        if (node != null) {
            var queueNode = new STAQ(node);
            /*
            queueNode.previous = null;
            queueNode.next = null;
            */
            if (this.back != null) {
                queueNode.previous = this.back;
                this.back.next = queueNode;
                this.back = queueNode;
            }
            else {
                this.front = queueNode;
                this.back = queueNode;
            }
        }
    }

    dequeue() {
        var frontNode = this.front;

        if (frontNode != null) {
            if (frontNode.next != null) {
                var queueNode = frontNode.next;
                queueNode.previous = null;
                this.front = queueNode;
            }
            else {
                this.back = null;
                this.front = null;
            }

            return frontNode.node;
        }

        return frontNode;
    }

    printQueue() {
        var currentNode = this.front;

        while (currentNode != null) {
            console.log(currentNode.node.value);
            currentNode = currentNode.next;
        }
        console.log("");
    }

    serialize(rootNode) {
        if (rootNode != null) {     // rootNode not empty
            this.enqueue(rootNode);
            this.serialize(rootNode.left);
            this.serialize(rootNode.right);
        }
        else {      // rootNode is empty (null)
            var leafNode = new NODE('N');
            this.enqueue(leafNode);
        }

        return this;
    }

    deserialize() {
        var treeNode = null;

        if (this.front != null) {    // Queue not empty
            treeNode = this.dequeue();

            if (treeNode.value != 'N') {   // Queue first node not 'N'
                treeNode.left = this.deserialize();
                treeNode.right = this.deserialize();
            }
            else {      // Queue first node has value 'N' (empty sentinel)
                treeNode = null;
            }
        }
        else {      // Queue is empty
            treeNode = null;
        }
        
        return treeNode;
    }
}

function main() {
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
    
    var order = "pre";          // or "post" or "in"
    root.recurseTree(root, order);
    console.log("");
    
    root = root.delete(root, 20);
    
    root.recurseTree(root, order);
    console.log("");
    
    if (root.findTreeNode(root, 29) != null) {
        console.log("Success!\n");
    }
    else {
        console.log("Failed!\n");
    }
    
    if (root.findTreeNode(root, 5) != null) {
        console.log("Success!\n");
    }
    else {
        console.log("Failed!\n");
    }
    
    if (root.findParentNode(root, 20)!= null) {
        console.log("Success!\n");
    }
    else {
        console.log("Failed!\n");
    }
    
    if (root.findParentNode(root, 14)!= null) {
        console.log("Success!\n");
    }
    else {
        console.log("Failed!\n");
    }
    
    var treeQueue = new QUEUE();
    treeQueue = treeQueue.serialize(root);
    
    treeQueue.printQueue();
    
    var treeNode = treeQueue.deserialize();
    treeNode.recurseTree(treeNode, order);
    console.log("");

    return 0;
}

main();
