//Add animationType from types/AnimationType.ts

import type { AnimationType } from "../types/AnimationType";


type Props = {
    values: number[];
    highlightedIndexes: number[];
    animationType?: AnimationType;
};


export function ListVisualizer({ values, highlightedIndexes, animationType } : Props) {

    const getColor = (index: number) => {
        if (!highlightedIndexes.includes(index)) return "#34383bff";

        switch (animationType) {
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
            default:
                return "#34383bff";
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center", marginTop: "20px"}}>
            {values.map((value, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center"}}>

                    <div
                        style={{
                            padding: "12px 18px",
                            border: "2px solid black",
                            borderRadius: "6px",
                            backgroundColor: getColor(index),
                            transition: "all 0.4s ease",
                            fontWeight: "bold",
                            transform: highlightedIndexes.includes(index) ? "scale(1.1)" : "scale(1)",
                            color: "white"
                        }}
                    >
                        {value}
                    </div>

                    {index < values.length -1 && (
                        <span style={{ margin: "0 10px", fontSize: "20px"}}>→</span>
                    )}
                </div>
            ))}
        </div>
    );
}