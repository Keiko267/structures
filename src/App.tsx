import { ListPage } from "./pages/ListPage";
import { TreePage } from "./pages/TreePage";

function App() {
  return (
    <div className="App">
      <ListPage />
      {/* Give a little bit of space between the two pages */}
      <div style={{ height: '20px' }} />
      <TreePage />
    </div>
  )
}

export default App;