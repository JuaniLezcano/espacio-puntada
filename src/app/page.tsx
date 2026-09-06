import { Hero } from "@/components/home/Hero";
import { RegularClasses } from "@/components/home/RegularClasses";
import { FeaturedWorkshops } from "@/components/home/FeaturedWorkshops";
import { FeaturedStudents } from "@/components/home/FeaturedStudents";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <RegularClasses />
      </Reveal>
      <Reveal>
        <FeaturedWorkshops />
      </Reveal>
      <Reveal>
        <FeaturedStudents />
      </Reveal>
    </>
  );
}
