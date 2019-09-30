function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

Node.prototype = {
    insert: function(newValue) {
        if (newValue < this.value) {
            if (this.left == null) {
                this.left = new Node(newValue);
            } else {
                this.left.insert(newValue);
            }
        } else if (newValue > this.value) {
            if (this.right == null) {
                this.right = new Node(newValue);
            } else {
                this.right.insert(newValue);
            }
        } else {
            console.log('Error: Did not insert %d, already present in tree\n', newValue);
        }
    },
    display: function() {
        console.log(this.value);
        if (this.left != null) {
            this.left.display();
        } else {
            console.log('N');
        }
        if (this.right != null) {
            this.right.display();
        } else {
            console.log('N');
        }
    },
    delete: function(value) {
        console.log("Deleting node with value %d starting at node %d", value, this.value);

        var replaceNode = null;
    
        if (value == this.value) {
            if (this.left != null) {
                replaceNode = this.left.findMaxNode();
                replaceNode.left = this.left;
                replaceNode.right = this.right;
                if (replaceNode.value == this.left.value) {
                    replaceNode.left = null;
                } else {
                    this.left.findParentOf(replaceNode.value).right = null;
                }
            } else if (this.right != null) {
                replaceNode = this.right.findMinNode();
                replaceNode.right = this.right;
                replaceNode.left = this.left;
                if (replaceNode.value == this.right.value) {
                    replaceNode.right = null;
                } else {
                    this.right.findParentOf(replaceNode.value).left = null;
                }
            }
    
            return replaceNode;
        } else {
            var parentNode = this.findParentOf(value);
    
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
                        replaceNode = currentNode.left.findMaxNode();
                        if (replaceNode == currentNode.left) {
                            currentNode.left = null;
                        }
                        else {
                            currentNode.findParentOf(replaceNode.value).right = null;
                        }
                        currentNode.value = replaceNode.value;
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
                        replaceNode = currentNode.right.findMinNode();
                        if (replaceNode == currentNode.right) {
                            currentNode.right = null;
                        }
                        else {
                            currentNode.findParentOf(replaceNode.value).left = null;
                        }
                        currentNode.value = replaceNode.value;
                    }
                }
            }
    
            return this;
        }
    },
    findParentOf: function(value) {
        console.log('Finding parent of node with value %d => %d', value, this.value);

        if (value < this.value) {
            if (this.left == null) {
                console.log('Error: %d not in tree', value);
            } else if (value == this.left.value) {
                return this;
            } else {
                return this.left.findParentOf(value);
            }
        } else if (value > this.value) {
            if (this.right == null) {
                console.log('Error: %d not in tree', value);
            } else if (value == this.right.value) {
                return this;
            } else {
                return this.right.findParentOf(value);
            }
        } else if (value == this.value) {
            console.log('Value at current node equals %d', value);
            return this;
        }
    },
    findMinNode: function() {
        console.log("Finding min tree node => %d", this.value);
        if (this.left != null) {
            return this.left.findMinNode();
        } else {
            return this;
        }
    },
    findMaxNode: function() {
        console.log("Finding max tree node => %d", this.value);
        if (this.right != null) {
            return this.right.findMaxNode();
        } else {
            return this;
        }
    },
    findNode: function(value) {
        var currentNode = null;
    
        if (value != this.value) {      // value not equal initial node value
            var parentNode = this.findParentOf(value);
    
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
            currentNode = this;
        }
    
        return currentNode;
    }
};

function List(node) {
    this.node = node;
    this.next = null;
}

function TreeSerializer() {
    this.front = null;
    this.back = null;
}

TreeSerializer.prototype = {
    enqueue: function(node) {
        if (node != null) {
            if (this.back != null) {
                this.back.next = node;
                this.back = node;
            }
            else {
                this.front = node;
                this.back = node;
            }
        }
    },
    dequeue: function() {
        var frontNode = this.front;
    
        if (frontNode != null) {
            if (frontNode.next != null) {
                var tempNode = frontNode.next;
                this.front = tempNode;
            }
            else {
                this.back = null;
                this.front = null;
            }
        }
        else {
            return "Queue is empty!";
        }
    
        return frontNode;
    },
    print: function() {
        var currentNode = this.front;
    
        while (currentNode != null) {
            console.log(currentNode.node.value);
            currentNode = currentNode.next;
        }
    },
    serialize: function(rootNode) {
        var queueNode = null;
    
        if (rootNode != null) {     // rootNode not empty
            queueNode = new List(rootNode);
            this.enqueue(queueNode);
            this.serialize(rootNode.left);
            this.serialize(rootNode.right);
        }
        else {      // rootNode is empty (null)
            var leafNode = new Node('N');
            queueNode = new List(leafNode);
            this.enqueue(queueNode);
        }
    },
    deserialize: function() {
        var queueNode = null;
        var treeNode = null;
    
        if (this.front != null) {    // serialQueue not empty
            queueNode = this.dequeue();
            treeNode = queueNode.node;
    
            if (treeNode.value != 'N') {   // serialQueue first node not 'N'
                treeNode.left = this.deserialize();
                treeNode.right = this.deserialize();
            }
            else {      // serialQueue first node has value 'N' (empty sentinel)
                treeNode = null;
            }
        }
        else {      // serialQueue is empty
            treeNode = null;
        }
        
        return treeNode;
    }
};

function main() {
    var rootNode = new Node(20);
    rootNode.insert(8);
    rootNode.insert(22);
    rootNode.insert(20);
    rootNode.insert(4);
    rootNode.insert(12);
    rootNode.insert(5);
    rootNode.insert(8);
    rootNode.insert(10);
    rootNode.insert(14);
    rootNode.insert(22);

    var exec = (func) => { func; console.log(''); }
    var execResult = (func) => { if (func != null) { console.log('Success!\n'); } else { console.log('Failure!\n'); } }

    exec(rootNode.display(rootNode));

    rootNode = rootNode.delete(20);
    console.log('');

    exec(rootNode.display(rootNode));

    execResult(rootNode.findNode(19));
    execResult(rootNode.findNode(5));
    execResult(rootNode.findParentOf(20));
    execResult(rootNode.findParentOf(14));

    var serialTree = new TreeSerializer();
    serialTree.serialize(rootNode);
    exec(serialTree.print());

    var newTree = serialTree.deserialize();
    exec(newTree.display(rootNode));
}

main();
