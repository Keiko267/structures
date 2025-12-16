import {useState} from "react";
import {LinkedList} from "../models/LinkedList";
import {ListVisualizer} from "../visualizers/ListVisualizer";
import {Button ,Stack, TextField, Typography, Paper } from "@mui/material";
import type { AnimationType } from "../types/AnimationType";

export function ListPage() {
    
    const[list, setList] = useState<LinkedList>(new LinkedList());
    
    const[highlightedIndexes, setHighlightedIndex] = useState<number[]>([]);

    const [animationType, setAnimationType] = useState<AnimationType>(null);
    
    const[searchValue, setSearchValue] = useState<string>("");
    
    const ANIMATION_SPEED = 500;

    const add = () => {
        const newValue = Math.floor(Math.random() * 100);
        list.insert(newValue);
        setList(list.clone());
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

    const searchAnimated = async () => {
        setHighlightedIndex([]);
        const value = Number(searchValue);

        if (isNaN(value)) return;

        const steps = list.getSearchSteps(value);

        for (const step of steps) {
            setHighlightedIndex(step.activeIndexes);
            setAnimationType(step.type);

            await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED));
        }

        if (steps.at(-1)?.type !== "found") {
            alert("Value not found in the list");
            setHighlightedIndex([]);
            setAnimationType(null);
        }
        await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED));
        setHighlightedIndex([]);
        setAnimationType(null);
    }

    const sortAnimated = async () => {
        setHighlightedIndex([]);

        const steps = list.getSortSteps();
        if (steps.length === 0) return;

        for (const step of steps) {

            setAnimationType(step.type);

            setHighlightedIndex(step.activeIndexes);
            await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED));


            const newList = new LinkedList();
            step.values.forEach(v => newList.insert(v));
            setList(newList);

            await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED));
        }

        setHighlightedIndex([]);
        setAnimationType(null);
    }



    const values: number[] = [];
    let current = list.head;
    while (current) {
        values.push(current.value);
        current = current.next;
    }

    return (
        <Paper elevation={3} sx={{p: 3, maxWidth: 900, margin: "0 auto", borderRadius: 4, mt: 4}}>
            <Typography variant="h4" gutterBottom>
                Linked List Visualizer
            </Typography>

            <Stack direction="row" spacing={2} mb={2}>
                <Button variant="contained" color="primary" onClick={add}>
                    Add Random Value
                </Button>
                <Button variant="contained" color="secondary" onClick={removeFirst} disabled={list.length === 0}>
                    Remove First
                </Button>
                <Button variant="contained" onClick={sortAnimated} disabled={list.length === 0}>
                    Sort List
                </Button>
            </Stack>

            <Stack direction="row" spacing={2} mb={3}>
                <TextField
                    type="number"
                    label="Search Value"
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button variant="contained" onClick={searchAnimated} disabled={searchValue === ""}>
                    Search
                </Button>
            </Stack>

            <ListVisualizer values={values} highlightedIndexes={highlightedIndexes} animationType={animationType} />
        </Paper>
    )
}