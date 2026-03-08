import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Contact from './components/Contact'
import SmoothScroll from './components/SmoothScroll'
import TransitionOverlay from './components/TransitionOverlay'

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <TransitionOverlay />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Stack />
        <Contact />
      </main>
    </>
  )
}
