import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './apps/common/ThemeContext';
import './index.css'

const Pickleball = lazy(() => import('./apps/Pickleball/Pickleball'));
const Contact = lazy(() => import("./apps/common/Contact/Contact"));
const Events = lazy(() => import("./apps/Events/Events"));
const EventPage = lazy(() => import('./apps/Events/EventPage'));
const LanguageLearningApp = lazy(() => import("./apps/LanguageApp/pages/LanguageApp"));
const FlashCardsV2 = lazy(() => import('./apps/LanguageApp/pages/flashcards/FlashCardsV2'));
const WordList = lazy(() => import('./apps/LanguageApp/pages/wordlist/WordList'));
const StoryReader = lazy(() => import('./apps/LanguageApp/pages/storyReader/StoryReader'));
const LanguageAppLayout = lazy(() => import('./apps/LanguageApp/LanguageAppLayout'));
const ViewLesson = lazy(() => import('./apps/LanguageApp/pages/viewLesson/ViewLesson'));
const MyDecks = lazy(() => import('./apps/LanguageApp/hooks/MyDecks'));
const LanguageAppHome = lazy(() => import('./apps/LanguageApp/LanguageHome'));
const SRSPictureLesson = lazy(() => import('./apps/LanguageApp/pages/srsFlashcards/SRSPictureLesson'));
const SRSHome = lazy(() => import('./apps/LanguageApp/pages/srsFlashcards/SRSHome'));
const SRSReview = lazy(() => import('./apps/LanguageApp/pages/srsFlashcards/SRSReview'));
const SRSStoryReader = lazy(() => import('./apps/LanguageApp/pages/srsFlashcards/SRSStoryReader'));
const SRSStoryList = lazy(() => import('./apps/LanguageApp/pages/srsFlashcards/SRSStoryList'));
const SRSPictureList = lazy(() => import('./apps/LanguageApp/pages/srsFlashcards/SRSPictureList'));
const NoPage = lazy(() => import('./apps/common/Core/NoPage'));
const Home = lazy(() => import('./apps/common/Core/Home'));
const Layout = lazy(() => import('./apps/common/Core/Layout'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Suspense fallback={null}>
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
            <Route path=":language/stories" element={<SRSStoryList />} />
            <Route path=":language/pictures" element={<SRSPictureList />} />
            <Route path=":language/srs/:deckId" element={<SRSReview />} />
            <Route path=":language/srs/:deckId/story/:storyId" element={<SRSStoryReader />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode >,
)
