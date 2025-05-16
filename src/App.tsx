import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./screens/Core/Layout";
import Home from "./screens/Core/Home";
import NoPage from "./screens/Core/NoPage";
import Pickleball from "./screens/Pickleball/Pickleball";
import Contact from "./screens/Contact/Contact";
import Wallerverse from "./screens/Wallerverse/Wallerverse"
import Events from "./screens/Events/Events";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pickleball" element={<Pickleball />} />
          <Route path="/wallerverse" element={<Wallerverse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
