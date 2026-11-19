import Window from "@/components/Window";
import FxOptions from "@/components/FxOptions";

export default function SettingsPage() {
  return (
    <Window title="Settings" width={430} x={120} y={70}>
      <FxOptions />
    </Window>
  );
}