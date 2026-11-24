import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Collections from './pages/Collections'
import CollectionDetail from './pages/CollectionDetail'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

/**
 * App routes. A shared Layout (navbar, cart drawer, footer) wraps
 * these in Phase 2.
 */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collection" element={<Collections />} />
          <Route path="/collection/:slug" element={<CollectionDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
