import type { AnimationStep } from "../models/LinkedList";
import { Box } from "@mui/material";

export function ListVisualizer({ values, activeIndexes, type} : AnimationStep) {

    const chunked: number[][] = [];

    const max_chunk_size = 10;

    for (let i = 0; i < values.length; i += max_chunk_size) {
        chunked.push(values.slice(i, i + max_chunk_size));
    }

    const getColor = (index: number) => {
        if (!activeIndexes.includes(index)) return "#34383bff";

        switch (type) {
            case "compare":
                return "#ffd54f";
            case "swap":
                return "#ab47bc";
            case "found":
                return "#66bb6a";
            case "insert":
                return "#42a5f5";
            case "remove":
                return "#ef5350";
            case "done":
                return "#26a69a";
            default:
                return "#34383bff";
        }
    }

    return (
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {chunked.map((row, rowIndex) => {
                const isReverse = rowIndex % 2 === 1;
                return (
                    <Box
                        key={rowIndex}
                        display="flex"
                        justifyContent={isReverse ? "flex-end" : "flex-start"}
                        alignItems="center"
                        gap={1}
                        flexWrap="wrap"
                    >
                        {row.map((value, index) => {
                            // Calculamos el índice global real de este valor
                            const globalIndex = rowIndex * max_chunk_size + index;

                            return (
                                <Box key={index} display="flex" alignItems="center">
                                    <Box
                                        sx={{
                                            px: 2,
                                            py: 1,
                                            border: "2px solid black",
                                            borderRadius: "6px",
                                            backgroundColor: getColor(globalIndex),
                                            transition: "all 0.4s ease",
                                            fontWeight: "bold",
                                            transform: activeIndexes.includes(globalIndex)
                                                ? "scale(1.1)"
                                                : "scale(1)",
                                            color: "white",
                                            minWidth: 40,
                                            textAlign: "center",
                                        }}
                                    >
                                        {value}
                                    </Box>
                                    {index < row.length - 1 && (
                                        <Box mx={0.5}>
                                            {isReverse ? "←" : "→"}
                                        </Box>
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                );
            })}
        </Box>
    );
}