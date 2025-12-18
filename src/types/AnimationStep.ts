import type { TreeNodeSnapshot } from "./TreeNodeSnapshot";

export type AnimationType = "compare" | "found" | "insert" | "remove" | "swap" | "done" | null;
export type ListAnimationStep = {
    values: number[];
    activeIndexes: number[];
    type: AnimationType;
    codeLine?: number;
}

export type TreeAnimationStep = {
    tree: TreeNodeSnapshot | null;
    activePath: number[];
    type: AnimationType;
}