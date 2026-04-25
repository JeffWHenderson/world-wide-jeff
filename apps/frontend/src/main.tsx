import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pickleball from './apps/Pickleball/Pickleball';
import Contact from "./apps/common/Contact/Contact";
import Events from "./apps/Events/Events";
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
import SRSPictureLesson from './apps/LanguageApp/pages/srsFlashcards/SRSPictureLesson';
import EventPage from './apps/Events/EventPage';
import SRSHome from './apps/LanguageApp/pages/srsFlashcards/SRSHome';
import SRSReview from './apps/LanguageApp/pages/srsFlashcards/SRSReview';
import SRSStoryReader from './apps/LanguageApp/pages/srsFlashcards/SRSStoryReader';
import NoPage from './apps/common/Core/NoPage';
import Home from './apps/common/Core/Home';
import Layout from './apps/common/Core/Layout';

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
            <Route path=":language/picture-review/:section" element={<SRSPictureLesson />} />
            <Route path=":language/srs" element={<SRSHome />} />
            <Route path=":language/srs/:deckId" element={<SRSReview />} />
            <Route path=":language/srs/:deckId/story/:storyId" element={<SRSStoryReader />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode >,
)
