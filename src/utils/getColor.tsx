export const getColor = (index: number, activeIndexes: number[], type: string|null) => {
        if (!activeIndexes.includes(index)) return "#34383bff";
        if (type === null) return "#34383bff";
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