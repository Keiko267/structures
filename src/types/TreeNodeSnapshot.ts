export type TreeNodeSnapshot = {
    value: number;
    left: TreeNodeSnapshot | null;
    right: TreeNodeSnapshot | null;
}
