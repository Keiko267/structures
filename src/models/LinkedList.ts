
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

    search(value: number): Node | boolean {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
        }
        return false;
    }

    sort(): void {
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
    }
}