import Hero from '../components/Hero/Hero';
import WorksPreview from '../components/WorksPreview/WorksPreview';
import About from '../components/About/About';

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <WorksPreview />
        <About />
      </main>
    </div>
  );
}
