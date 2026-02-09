import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./screens/Core/Layout";
import Home from "./screens/Core/Home";
import NoPage from "./screens/Core/NoPage";
import Pickleball from "./screens/Pickleball/Pickleball";
import Contact from "./screens/Contact/Contact";
import Events from "./screens/Events/Events";
import LanguageLearningApp from "./screens/LanguageApp/LanguageApp";
import './index.css'
import FlashCardsV2 from './screens/LanguageApp/components/FlashCardsV2';
import WordList from './screens/LanguageApp/components/WordList';
import StoryReader from './screens/LanguageApp/components/StoryReader';
import LanguageAppLayout from './screens/LanguageApp/LanguageAppLayout';
import ViewLesson from './screens/LanguageApp/components/ViewLesson';
import { ThemeProvider } from './screens/Core/ThemeContext';

// TO MAYBE DO: I could use all this lazy imports but its so small I'd probably just rather not
// import WallerverseHome from "./screens/Wallerverse/WallerverseHome"
// const FlashCardsV2 = lazy(() => import('./screens/LanguageApp/components/FlashCardsV2'));
// const NoPage = lazy(() => import("./screens/Core/NoPage"));
// const LanguageLearningApp = lazy(() => import("./screens/LanguageApp/LanguageApp"));
// const StoryReader = lazy(() => import('./screens/LanguageApp/components/StoryReader'));
// const WallerverseHome = lazy(() => import("./screens/Wallerverse/WallerverseHome"));
// const Events = lazy(() => import("./screens/Events/Events"));
// const Contact = lazy(() => import("./screens/Contact/Contact"));
// const WordList = lazy(() => import('./screens/LanguageApp/components/WordList'));
// const LanguageAppLayout = lazy(() => import('./screens/LanguageApp/LanguageAppLayout'));


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/pickleball" element={<Pickleball />} />
            {/* <Route path="/wallerverse" element={<WallerverseHome />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
          </Route>
          <Route path="/language-app" element={<LanguageAppLayout />} >
            <Route path=":language" element={<LanguageLearningApp />} />
            <Route path=":language/flashcards/:lessonId" element={<FlashCardsV2 />} />
            <Route path=":language/story/:lessonId" element={<StoryReader />} />
            <Route path=":language/wordlist/:section/:lessonId" element={<WordList />} />
            <Route path=":language/view-lesson/:lessonId" element={<ViewLesson />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode >,
)
