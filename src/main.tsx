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
import LanguageLearningApp from "./screens/LanguageApp/LanguageApp";
import './index.css'
import FlashCardsV2 from './screens/LanguageApp/components/FlashCards/FlashCardsV2';
import StoryReader from './screens/LanguageApp/components/StoryReader/StoryReader';
import LanguageAppLayout from './screens/LanguageApp/LanguageAppLayout';


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
        </Route>
        <Route path="/language-app" element={<LanguageAppLayout />} >
          <Route path=":language" element={<LanguageLearningApp />} />
          <Route path=":language/flashcards" element={<FlashCardsV2 />} />
          <Route path=":language/story" element={<StoryReader />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode >,
)
