import { Hero } from "@/components/home/Hero";
import { RegularClasses } from "@/components/home/RegularClasses";
import { FeaturedWorkshops } from "@/components/home/FeaturedWorkshops";
import { FeaturedStudents } from "@/components/home/FeaturedStudents";
import { PinkedDivider } from "@/components/ui/PinkedDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <PinkedDivider from="background-alt" to="background" />
      <RegularClasses />
      <PinkedDivider from="background" to="background-alt" />
      <FeaturedWorkshops />
      <PinkedDivider from="background-alt" to="background" />
      <FeaturedStudents />
    </>
  );
}
