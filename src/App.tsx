import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./screens/Layout";
import Home from "./screens/Home";
import NoPage from "./screens/NoPage";
import Pickleball from "./screens/Pickleball";
import Contact from "./screens/Contact";
import Wallerverse from "./screens/Wallerverse"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pickleball" element={<Pickleball />} />
          <Route path="/wallerverse" element={<Wallerverse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
