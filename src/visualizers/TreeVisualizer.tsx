import type { AnimationType} from "../types/AnimationStep";
import type { TreeNodeSnapshot } from "../types/TreeNodeSnapshot";
import { getColor } from "../utils/getColor";
import { Box } from "@mui/material";

type Props = {
    tree: TreeNodeSnapshot | null;
    activePath: number[];
    type: AnimationType;
}


export function TreeVisualizer({tree, activePath, type} : Props) {
    const renderNode = (node: TreeNodeSnapshot | null) => { // We accept null to reserve the structure of the tree even when some nodes are missing
        if (!node) return <Box width={120}/>;

        const isActive = activePath.includes(node.id);

        return (
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} minWidth={240}>
                {/* Node circle */}
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: getColor(node.id, activePath, type),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        transition: "all 0.4s ease",
                        transform: isActive ? "scale(1.2)" : "scale(1)"
                    }}
                >
                    {node.value}
                </Box>
                {/* Children */}
                <Box display={"flex"} justifyContent={"space-between"} width={"100%"} mt={2}>
                    <Box width={"50%"} display={"flex"} justifyContent={"center"}>
                        
                        {renderNode(node.left)}
                        
                    </Box>
                    
                    <Box width={"50%"} display={"flex"} justifyContent={"center"}>
                        {renderNode(node.right)}
                    </Box>
                </Box>
            </Box>
        );
    };

    return <Box mt={4}>{tree && renderNode(tree)}</Box>

}