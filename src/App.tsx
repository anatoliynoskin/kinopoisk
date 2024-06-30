import { Route, Routes } from "react-router-dom"
import MoviesPage from "./Pages/MoviesPage"
import SingleMoviePage from "./Pages/SingleMoviePage"
import Layout from "./components/Layout"
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MoviesPage />} />
          <Route path="movies/:pageNumber" element={<MoviesPage />} />
          <Route path="movie/:movieId" element={<SingleMoviePage />}/>
          <Route path="*" element={<MoviesPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
