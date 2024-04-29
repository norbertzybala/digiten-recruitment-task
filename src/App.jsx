import './App.css'
import DataVisualisation from "./components/DataVisulisation/DataVisualisation.jsx";
import GalleryImage from "./components/GalleryImage/GalleryImage.jsx";
import TodoList from "./components/TodoList/TodoList.jsx";

function App() {

  return (
    <main>
      <DataVisualisation />
      <GalleryImage />
      <TodoList />
    </main>
  )
}

export default App
