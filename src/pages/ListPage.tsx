import {useState} from "react";
import {LinkedList} from "../models/LinkedList";
import {ListVisualizer} from "../visualizers/ListVisualizer";

export function ListPage() {

    //Create a linked list instance
    const[list, setList] = useState<LinkedList>(new LinkedList());

    //Update list and re-render
    const add = () => {
        list.insert(Math.floor(Math.random() * 100));

        const newList = new LinkedList();
        let current = list.head;
        while (current) {
            newList.insert(current.value);
            current = current.next;
        }
        setList(newList);
    }

    const removeFirst = () => {
        list.removeFirst();

        const newList = new LinkedList();
        let current = list.head;
        
        while (current) {
            newList.insert(current.value);
            current = current.next;
        }
        setList(newList);
    }

    const values: number[] = [];
    let current = list.head;
    while (current) {
        values.push(current.value);
        current = current.next;
    }

    return (
        <div>
            <h2>Linked List</h2>
            <button onClick={add}>Add random number</button>
            <button onClick={removeFirst}>Remove first</button>
            <ListVisualizer values={values} />
        </div>
    )
}