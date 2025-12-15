export function ListVisualizer({ values } : { values: number[]}) {
    return (
        <div style={{ display: "flex", gap: "10px"}}>
            {values.map((v, i) => (
                <div key={i} className="box">{v}</div>
            ))}
        </div>
    )
}