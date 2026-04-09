import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./apps/worldWideJeff/Core/Layout";
import Home from "./apps/worldWideJeff/Core/Home";
import NoPage from "./apps/worldWideJeff/Core/NoPage";
import Pickleball from "./apps/worldWideJeff/Pickleball/Pickleball";
import Contact from "./apps/worldWideJeff/Contact/Contact";
import Events from "./apps/worldWideJeff/Events/Events";
import LanguageLearningApp from "./apps/LanguageApp/pages/LanguageApp";
import './index.css'
import FlashCardsV2 from './apps/LanguageApp/pages/flashcards/FlashCardsV2';
import WordList from './apps/LanguageApp/pages/wordlist/WordList';
import StoryReader from './apps/LanguageApp/pages/storyReader/StoryReader';
import LanguageAppLayout from './apps/LanguageApp/LanguageAppLayout';
import ViewLesson from './apps/LanguageApp/pages/viewLesson/ViewLesson';
import MyDecks from './apps/LanguageApp/hooks/MyDecks';
import { ThemeProvider } from './apps/common/ThemeContext';
import LanguageAppHome from './apps/LanguageApp/LanguageHome';
import PicturePopUp from './apps/LanguageApp/pages/pictureLesson/PicturePopUp';
import EventPage from './apps/worldWideJeff/Events/EventPage';

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
            <Route path="/events/:eventId" element={<EventPage />} />
          </Route>
          <Route path="/language-app" element={<LanguageAppLayout />} >
            <Route index element={<LanguageAppHome />} />
            <Route path=":language" element={<LanguageLearningApp />} />
            <Route path=":language/flashcards/:section/:lessonId" element={<FlashCardsV2 />} />
            <Route path=":language/story/:section/:lessonId" element={<StoryReader />} />
            <Route path=":language/wordlist/:section/:lessonId" element={<WordList />} />
            <Route path=":language/view-lesson/:lessonId" element={<ViewLesson />} />
            <Route path=":language/my-decks" element={<MyDecks />} />
            <Route path=":language/my-decks/:section/:lessonId" element={<FlashCardsV2 />} />
            <Route path=":language/picture-review/:section" element={<PicturePopUp />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode >,
)
