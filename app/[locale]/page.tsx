import Clients from "@/components/home/Clients";
import Hero from "@/components/home/Hero";
import Team from "@/components/home/Team";

export default async function HomePage() {
  return (
    <main>
      <Hero />
      <Team />
      <Clients />
      <div className="h-[25px] bg-background"></div>
    </main>
  );
}
