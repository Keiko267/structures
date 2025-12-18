import {useState} from "react";
import {LinkedList} from "../models/LinkedList";
import {ListVisualizer} from "../visualizers/ListVisualizer";
import {Button ,Stack, TextField, Typography, Paper, Slider, /* IconButton, Collapse, */ Box } from "@mui/material";
//import { PseudoCodeViewer } from "../components/PseudoCodeViewer";
import type { ListAnimationStep, AnimationType } from "../types/AnimationStep";
//import ChevronRight from "@mui/icons-material/ChevronRight";
//import { bubbleSortPseudoCode } from "../constants/pseudocode";

export function ListPage() {
    
    const[list, setList] = useState<LinkedList>(new LinkedList());
    
    const[highlightedIndexes, setHighlightedIndex] = useState<number[]>([]);

    const [animationType, setAnimationType] = useState<AnimationType>(null);
    
    const[searchValue, setSearchValue] = useState<string>("");

    //const[activeCodeLine, setActiveCodeLine] = useState<number | null>(null);

    //const[showCode, setShowCode] = useState<boolean>(false);

    const [speed, setSpeed] = useState<number>(500);

    const max_elements = 12;
    
    const runAnimation = async (steps: ListAnimationStep[]) => {
        for (const step of steps) {
            setHighlightedIndex(step.activeIndexes);
            setAnimationType(step.type);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }

    const stopAnimation = () => {
        setHighlightedIndex([]);
        setAnimationType(null);
    }

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

        await runAnimation(steps);

        if (steps.at(-1)?.type !== "found") {
            alert("Value not found in the list");
            stopAnimation();
            return;
        }
        await new Promise(resolve => setTimeout(resolve, speed));
        stopAnimation();
    }

    const sortAnimated = async () => {
        setHighlightedIndex([]);

        const steps = list.getSortSteps();
        console.log(steps);
        if (steps.length === 0) return;

        for (const step of steps) {

            setHighlightedIndex([]);
            
            setList(() => { 
                const newList = new LinkedList();
                step.values.forEach(value => newList.insert(value));
                return newList;
            });

            setHighlightedIndex(step.activeIndexes);
            //setActiveCodeLine(step.codeLine || null);
            setAnimationType(step.type);

            if (step.type === "done") {
                console.log("done");
                setHighlightedIndex(step.values.map((_: any, index: any) => index));
                setAnimationType("done");
                //setActiveCodeLine(null);
                await new Promise(resolve => setTimeout(resolve, speed));
            }

            await new Promise(resolve => setTimeout(resolve, speed));
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
        <Box>
            <Paper elevation={3} sx={{p: 3, maxWidth: 1100, margin: "0 auto", borderRadius: 4, mt: 4}}>
                <Typography variant="h4" gutterBottom>
                    Linked List Visualizer
                </Typography>

                <Typography gutterBottom>
                    Animation Speed
                </Typography>
                <Slider
                    min={100}
                    max={1500}
                    step={100}
                    value={speed}
                    onChange={(_e, value) => setSpeed(value as number)}
                    valueLabelDisplay="auto"
                />

                <Stack direction="row" spacing={2} mb={2}>
                    <Button variant="contained" color="primary" onClick={add} disabled={list.length >= max_elements}>
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

                <Stack direction="row" alignItems="stretch" spacing={1}>

                    <Box flex={1} minWidth={0}>
                        <ListVisualizer
                            values={values}
                            activeIndexes={highlightedIndexes}
                            type={animationType}
                        />
                    </Box>
                </Stack>
            </Paper>
        </Box>
    )
}