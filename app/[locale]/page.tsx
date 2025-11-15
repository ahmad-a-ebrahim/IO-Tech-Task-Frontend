import { getClients } from "@/actions/clients";
import { getProfiles } from "@/actions/profiles";
import { getTeam } from "@/actions/team";
import Clients from "@/components/home/Clients";
import Hero from "@/components/home/Hero";
import Team from "@/components/home/Team";

export default async function HomePage() {
  const { profiles } = await getProfiles();
  const { team } = await getTeam();
  const { clients } = await getClients();

  return (
    <main>
      <Hero profiles={profiles} />
      <Team team={team} />
      <Clients clients={clients} />
      <div className="h-[25px] bg-background"></div>
    </main>
  );
}
