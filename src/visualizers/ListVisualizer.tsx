import type { ListAnimationStep } from "../types/AnimationStep";
import { getColor } from "../utils/getColor";
import { Box } from "@mui/material";

export function ListVisualizer({ values, activeIndexes, type} : ListAnimationStep) {


    const chunked: number[][] = [];

    const max_chunk_size = 12;

    for (let i = 0; i < values.length; i += max_chunk_size) {
        chunked.push(values.slice(i, i + max_chunk_size));
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
                                            backgroundColor: getColor(globalIndex, activeIndexes, type),
                                            transition: "all 0.4s ease",
                                            fontWeight: "bold",
                                            transform: activeIndexes.includes(globalIndex)
                                                ? "scale(1.2)"
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