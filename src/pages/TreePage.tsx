import { useState } from "react";
import { BTree } from "../models/BTree";
import { TreeVisualizer } from "../visualizers/TreeVisualizer";
import { Button, Stack, TextField, Typography, Paper, Slider } from "@mui/material";
import type { TreeAnimationStep } from "../types/AnimationStep";
import type { TreeNodeSnapshot } from "../types/TreeNodeSnapshot";

export function TreePage() {
    const [tree, setTree] = useState<BTree>(new BTree(true));

    const [currentStep, setCurrentStep] = useState<TreeAnimationStep | null>(null);
    const [currentTreeSnapchot, setCurrentTreeSnapchot] = useState<TreeNodeSnapshot | null>(tree.toSnapchot());

    const [speed, setSpeed] = useState<number>(500);
    const [inputValue, setInputValue] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");

    const max_elements = 30;

    const runAnimation = async (steps: TreeAnimationStep[]) => {
        for (const step of steps) {
            setCurrentStep(step);
            setCurrentTreeSnapchot(step.tree);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        
    }

    const insertAnimated = async ()  => {
        if (tree.toArray().length >= max_elements) {
            alert("Maximum number of elements reached");
            return;
        }
        const value = Number(inputValue);
        if (isNaN(value)) return;

        const steps = tree.getInsertSteps(value);
        await runAnimation(steps);

        const newTree = tree.clone();
        newTree.insert(value);
        setTree(newTree);
        setCurrentTreeSnapchot(newTree.toSnapchot());

        setInputValue("");

    }

    const searchAnimated = async () => {
        const value = Number(searchValue);
        if (isNaN(value)) return;
        setSearchValue("");
        const steps = tree.getSearchSteps(value);
        await runAnimation(steps);

        //Reset highlighted nodes setting activePath to empty
        setCurrentStep({
            tree: currentStep?.tree ?? null,
            activePath: [],
            type: null
        });
        
    }

    return (
        <Paper sx={{
            p: 3,
            maxWidth: 1100,
            margin: "0 auto"
        }}>
            <Typography variant="h4" gutterBottom>
                Binary Search Tree Visualizer
            </Typography>

            <Stack direction="row" spacing={2} mb={2}>
                <TextField
                    type="number"
                    label="Insert Value"
                    size="small"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button variant="contained" onClick={insertAnimated} disabled={inputValue === "" || tree.toArray().length >= max_elements}>
                    Insert Value
                </Button>
            </Stack>
            <Stack direction="row" spacing={2} mb={2}>
                <TextField
                    type="number"
                    label="Search Value"
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button variant="contained" onClick={searchAnimated} disabled={searchValue === ""}>
                    Search Value
                </Button>
            </Stack>

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
            {currentStep && (
                <TreeVisualizer
                    tree={currentTreeSnapchot}
                    activePath={currentStep?.activePath ?? []}
                    type={currentStep?.type ?? null}
                />
            )}
        </Paper>
    )
}