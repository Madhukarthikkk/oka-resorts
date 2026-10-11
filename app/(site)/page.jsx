import DevStrip from '@/components/DevStrip';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Location from '@/components/home/Location';
import MasterPlan from '@/components/home/MasterPlan';
import PlotSizes from '@/components/home/PlotSizes';
import Amenities from '@/components/home/Amenities';
import PhaseStrip from '@/components/home/PhaseStrip';
import Faq from '@/components/home/Faq';

export default function HomePage() {
  return (
    <>
      <DevStrip />
      <main>
        <Hero />
        <About />
        <Location />
        <MasterPlan />
        <PlotSizes />
        <Amenities />
        <PhaseStrip />
        <Faq />
      </main>
    </>
  );
}
