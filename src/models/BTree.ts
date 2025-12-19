import type { TreeAnimationStep } from "../types/AnimationStep";
import type { TreeNodeSnapshot } from "../types/TreeNodeSnapshot";

let NODE_ID = 0;
class Node {
    id: number;
    value: number;
    left: Node | null;
    right: Node | null;

    constructor(value: number) {
        this.id = NODE_ID++;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export class BTree {
    constructor(resetID: boolean = false) {
        if (resetID) NODE_ID = 0;
    }
    root: Node | null = null;

    toSnapchot(node: Node | null = this.root): TreeNodeSnapshot | null {
        if (node === null) return null;
        return {
            id: node.id,
            value: node.value,
            left: this.toSnapchot(node.left),
            right: this.toSnapchot(node.right)
        }

    }

    insert(value: number): void {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while(true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            }
            else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    getInsertSteps(value: number) : TreeAnimationStep[] {
        const steps: TreeAnimationStep[] = [];
        const treeCopy = this.clone();

        let current = treeCopy.root;
        const path: number[] = [];

        if (!current) {
            treeCopy.root = new Node(value);
            steps.push({
                tree: treeCopy.toSnapchot(),
                activePath: [treeCopy.root.id],
                type: "insert"
            });
            return steps;
        }

        while (true) {
            path.push(current.id);

            steps.push({
                tree: treeCopy.toSnapchot(),
                activePath: [...path],
                type: "compare"
            });

            if (value < current.value) {
                if (!current.left) {
                    current.left = new Node(value);
                    path.push(current.left.id);
                    steps.push({
                        tree: treeCopy.toSnapchot(),
                        activePath: [...path],
                        type: "insert"
                    });
                    break;
                }
                current = current.left;
            }
            else {
                if (!current.right) {
                    current.right = new Node(value);
                    path.push(current.right.id);
                    steps.push({
                        tree: treeCopy.toSnapchot(),
                        activePath: [...path],
                        type: "insert"
                    });
                    break;
                }
                current = current.right;
            }
        }
        steps.push({
            tree: treeCopy.toSnapchot(),
            activePath: [],
            type: "done"
        });
        return steps;
    }

    clone(): BTree {
        const newTree = new BTree();

        const cloneNode = (node: Node | null): Node | null => {
            if (!node) return null;

            const newNode = new Node(node.value);
            newNode.id = node.id; // 👈 CLAVE
            newNode.left = cloneNode(node.left);
            newNode.right = cloneNode(node.right);

            return newNode;
        };

        newTree.root = cloneNode(this.root);
        return newTree;
    }

    toArray(): number[] {
        const result: number[] = [];

        const queue: (Node | null)[] = [this.root];

        while (queue.length) {
            const node = queue.shift()!;

            if (node) {
                result.push(node.value);
                queue.push(node.left);
                queue.push(node.right);
            }
        }

        return result;
    }

    getSearchSteps(value: number) : TreeAnimationStep[] {
        const steps: TreeAnimationStep[] = [];
        const treeCopy = this.clone();
        let current = treeCopy.root;
        if (current === null) {
            alert("Value not found in tree");
            return steps;
        }
        const path: number[] = [];

        while (current) {
            path.push(current.id);
            steps.push({
                tree: treeCopy.toSnapchot(),
                activePath: [...path],
                type: current.value === value ? "found" : "compare"
            });

            if (current.value === value) {
                steps.push({
                    tree: treeCopy.toSnapchot(),
                    activePath: [],
                    type: "done"
                });
                return steps;
            }

            current = value < current.value ? current.left : current.right;
        }
        
        alert("Value not found in tree");
        return steps;
    }
}