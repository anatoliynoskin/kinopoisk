import { Route, Routes } from "react-router"
import FilmsPage from "./Pages/FilmsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<FilmsPage />}/>
    </Routes>
  )
}

export default App
