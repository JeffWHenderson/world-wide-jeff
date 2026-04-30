import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './apps/common/ThemeContext';
import './index.css'

const WallerverseLayout = lazy(() => import('./apps/Wallerverse/WallerverseLayout'));
const WallerverseHome = lazy(() => import('./apps/Wallerverse/WallerverseHome'));
const WallerverseProfile = lazy(() => import('./apps/Wallerverse/WallerverseProfile'));
const WallerverseLogin = lazy(() => import('./apps/Wallerverse/WallerverseLogin'));
const Pickleball = lazy(() => import('./apps/Pickleball/Pickleball'));
const Contact = lazy(() => import("./apps/common/Contact/Contact"));
const Events = lazy(() => import("./apps/Events/Events"));
const EventPage = lazy(() => import('./apps/Events/EventPage'));
const LanguageLearningApp = lazy(() => import("./apps/LanguageApp/pages/LanguageApp"));
const LanguageAppLayout = lazy(() => import('./apps/LanguageApp/LanguageAppLayout'));
const LanguageAppHome = lazy(() => import('./apps/LanguageApp/LanguageHome'));
const SRSPictureLesson = lazy(() => import('./apps/LanguageApp/pages/SRSPictureLesson'));
const SRSHome = lazy(() => import('./apps/LanguageApp/pages/SRSHome'));
const SRSReview = lazy(() => import('./apps/LanguageApp/pages/SRSReview'));
const SRSStoryReader = lazy(() => import('./apps/LanguageApp/pages/SRSStoryReader'));
const SRSStoryList = lazy(() => import('./apps/LanguageApp/pages/SRSStoryList'));
const SRSPictureList = lazy(() => import('./apps/LanguageApp/pages/SRSPictureList'));
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
              <Route path="/wallerverse" element={<WallerverseLayout />}>
                <Route index element={<WallerverseHome />} />
                <Route path="login" element={<WallerverseLogin />} />
                <Route path="profile/:username" element={<WallerverseProfile />} />
              </Route>
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId" element={<EventPage />} />
            </Route>
            <Route path="/language-app" element={<LanguageAppLayout />} >
              <Route index element={<LanguageAppHome />} />
              <Route path=":language" element={<LanguageLearningApp />} />
              <Route path=":language/picture-review/:section" element={<SRSPictureLesson />} />
              <Route path=":language/stories" element={<SRSStoryList />} />
              <Route path=":language/pictures" element={<SRSPictureList />} />
              <Route path=":language/" element={<SRSHome />} />
              <Route path=":language/:deckId" element={<SRSReview />} />
              <Route path=":language/:deckId/story/:storyId" element={<SRSStoryReader />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode >,
)


// OLD VERSION OF LANGUAGE APP
// <Route path=":language/flashcards/:section/:lessonId" element={<FlashCardsV2 />} />
// <Route path=":language/story/:section/:lessonId" element={<StoryReader />} />
// <Route path=":language/wordlist/:section/:lessonId" element={<WordList />} />
// <Route path=":language/view-lesson/:lessonId" element={<ViewLesson />} />
// <Route path=":language/my-decks" element={<MyDecks />} />
// <Route path=":language/my-decks/:section/:lessonId" element={<FlashCardsV2 />} /> 

// const FlashCardsV2 = lazy(() => import('./apps/LanguageApp/pages/flashcards/FlashCardsV2'));
// const WordList = lazy(() => import('./apps/LanguageApp/pages/wordlist/WordList'));
// const StoryReader = lazy(() => import('./apps/LanguageApp/pages/storyReader/StoryReader'));
// const ViewLesson = lazy(() => import('./apps/LanguageApp/pages/viewLesson/ViewLesson'));
// const MyDecks = lazy(() => import('./apps/LanguageApp/hooks/MyDecks'));