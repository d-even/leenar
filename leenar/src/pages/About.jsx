import AboutHero from '../components/about/AboutHero'
import Founders from '../components/about/Founders'
import ProcessSteps from '../components/about/ProcessSteps'
import WhyLeenar from '../components/about/WhyLeenar'

/**
 * About page (/about): hero card, founders + numbers, the bag-making process
 * as stacking cards, and a "Why Choose Leenar" bento grid.
 * Text and photos are edited in src/data/about.js.
 */
export default function About() {
  return (
    <>
      <AboutHero />
      <Founders />
      <ProcessSteps />
      <WhyLeenar />
    </>
  )
}
