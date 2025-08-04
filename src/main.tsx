import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./screens/Core/Layout";
import Home from "./screens/Core/Home";
import NoPage from "./screens/Core/NoPage";
import Pickleball from "./screens/Pickleball/Pickleball";
import Contact from "./screens/Contact/Contact";
import WallerverseHome from "./screens/Wallerverse/WallerverseHome"
import Events from "./screens/Events/Events";
import LanguageLearningApp from "./screens/Language/LanguageApp";
import './index.css'
import FlashCardsV2 from './screens/Language/FlashCardsV2';
import FlashCards from './screens/Language/FlashCards';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pickleball" element={<Pickleball />} />
          <Route path="/wallerverse" element={<WallerverseHome />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/flashcardsv2" element={<FlashCardsV2 />} />
          <Route path="/flashcardsv1" element={<FlashCards />} />
          <Route path="/language-app" element={<LanguageLearningApp />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
