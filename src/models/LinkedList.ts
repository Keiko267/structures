import type { ListAnimationStep } from "../types/AnimationStep";
class Node {
    value: number;
    next: Node | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {

    head: Node | null;
    tail: Node | null;
    length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insert(value: number): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            if (this.tail) {
                this.tail.next = newNode;
                this.tail = newNode;
            }
        }
        this.length++;
    }

    clone(): LinkedList {
        const newList = new LinkedList();
        let current = this.head;
        while (current) {
            newList.insert(current.value);
            current = current.next;
        }
        return newList;
    }

    removeFirst (): void {
        if (!this.head) {
            return;
        }
        this.head = this.head.next;
        this.length--;
    }

    removeLast (): void {
        if (!this.head) {
            return;
        }
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            let current = this.head;
            while(current.next && current.next !== this.tail) {
                current = current.next;
            }
            current.next = null;
            this.tail = current;
        }
        this.length--;
    }

    search(value: number): number {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    /* private sort(): void {
        let temp: number;
        if (!this.head || !this.head.next) {
            return;
        }
        else {
            let current: Node | null = this.head;
            while (current) {
                let index = current.next;
                while (index) {
                    if (current.value > index.value) {
                        temp = current.value;
                        current.value = index.value;
                        index.value = temp;
                    }
                    index = index.next;
                }
                current = current.next;
            }
        }
    } */

    private toArray(): number[] {
        const array: number[] = [];
        let current = this.head;
        while (current) {
            array.push(current.value);
            current = current.next;
        }
        return array;
    }

    getSortSteps(): ListAnimationStep[] {
        const steps: ListAnimationStep[] = [];
        const listCopy = this.clone();

        let i = 0;
        let current = listCopy.head;
        if (!current) return steps;

        while (current) {
            let j = i + 1;
            let index = current.next;
            while (index) {
                steps.push({
                    values: listCopy.toArray(),
                    activeIndexes: [i, j],
                    type: "compare",
                    codeLine: 2
                });
                if (current.value > index.value) {
                    const temp = current.value;
                    current.value = index.value;
                    index.value = temp;

                    steps.push({
                        values: listCopy.toArray(),
                        activeIndexes: [i, j],
                        codeLine: 3,
                        type: "swap"
                    });
                }
                index = index.next;
                j++;
            }
            current = current.next;
            i++;
        }
        steps.push({
            values: listCopy.toArray(),
            activeIndexes: [],
            type: "done",
            codeLine: undefined
        });
        return steps;
    }

    getSearchSteps(value: number) : ListAnimationStep[] {
        const steps: ListAnimationStep[] = [];
        const listCopy = this.clone();
        let index = 0;
        let current = listCopy.head;

        while (current) {
            steps.push({
                values: listCopy.toArray(),
                activeIndexes: [index],
                type: current.value === value ? "found" : "compare"
            });

            if (current.value === value) {
                return steps;
            }

            current = current.next;
            index++;
        }
        return steps;
    }

}