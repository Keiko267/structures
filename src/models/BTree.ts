import type { TreeAnimationStep } from "../types/AnimationStep";
import type { TreeNodeSnapshot } from "../types/TreeNodeSnapshot";

class Node {
    value: number;
    left: Node | null;
    right: Node | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export class BTree {
    root: Node | null = null;

    toSnapchot(node: Node | null = this.root): TreeNodeSnapshot | null {
        if (node === null) return null;
        return {
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
                activePath: [value],
                type: "insert"
            });
            return steps;
        }

        while (true) {
            path.push(current.value);

            steps.push({
                tree: treeCopy.toSnapchot(),
                activePath: [...path],
                type: "compare"
            });

            if (value < current.value) {
                if (!current.left) {
                    current.left = new Node(value);
                    path.push(value);
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
                    path.push(value);
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

    clone() : BTree {
        const newTree = new BTree();

        const traverse = (node: Node | null) => {
            if (!node) return;
            newTree.insert(node.value);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(this.root);
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
        let index = 0;

        while (current) {
            steps.push({
                tree: treeCopy.toSnapchot(),
                activePath: this.getIndex(treeCopy.root, current) !== -1 ? [current.value] : [],
                type: current.value === value ? "found" : "compare"
            });

            if (current.value === value) return steps;

            current = value < current.value ? current.left : current.right;
            index++;
        }
        return steps;
    }

    private getIndex(root: Node | null, target: Node) : number {
        if (root === null) return -1;

        const queue: Node[] = [root];
        let index = 0;

        while (queue.length) {
            const node = queue.shift()!;
            if (node === target) return index;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            index++;
        }
        return -1;
    }
}