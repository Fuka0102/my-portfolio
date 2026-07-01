import Hero from '../components/Hero/Hero';
import WorksPreview from '../components/WorksPreview/WorksPreview';
import About from '../components/About/About';
import Experience from '../components/Experience/Experience';

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <WorksPreview />
        <About />
        <Experience />
      </main>
    </div>
  );
}
