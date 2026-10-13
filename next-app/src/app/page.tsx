import Hero from '../components/Hero/Hero';
import WorksPreview from '../components/WorksPreview/WorksPreview';
import WorksData from '../components/WorksData/WorksData';
import About from '../components/About/About';
import Experience from '../components/Experience/Experience';
import Contact from '../components/Contact/Contact';

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <WorksPreview>
          <WorksData />
        </WorksPreview>
        <About />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
