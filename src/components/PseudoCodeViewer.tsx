import {Paper, Box} from "@mui/material";

interface Props {
    code: String[];
    activeLine: number | null;
}

export function PseudoCodeViewer({code, activeLine}: Props) {
    return (
        <Paper sx={{
            p: 2, 
            flex: 1,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            backgroundColor: "background.default"
            }}
        >
            {code.map((line, index) => (
                <Box
                    key={index}
                    sx={{
                        fontFamily: "monospace",
                        px: 1,
                        py: 0.5,
                        fontSize: "0.9rem",
                        whiteSpace: "pre",
                        borderRadius: 1,
                        backgroundColor: activeLine === index ? "primary.main" : "transparent",
                        color: activeLine === index ? "black" : "inherit",
                        transition: "all .3s"
                    }}
                >
                    {line}
                </Box>
            ))}
        </Paper>
    );
}