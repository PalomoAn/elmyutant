import Window from "@/components/Window";
import WelcomeContent from "@/components/WelcomeContent";

export const metadata = {
  title: { absolute: "elMyutant · Jose, freelance developer" },
};

export default function Home() {
  return (
    <Window title="Welcome" closeHref="/desktop">
      <WelcomeContent />
    </Window>
  );
}