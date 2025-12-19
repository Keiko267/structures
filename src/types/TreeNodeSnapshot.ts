export type TreeNodeSnapshot = {
    id: number;
    value: number;
    left: TreeNodeSnapshot | null;
    right: TreeNodeSnapshot | null;
}
