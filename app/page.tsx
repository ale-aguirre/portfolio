import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Contact from './components/Contact'

export default function Page() {
  return (
    <>
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
