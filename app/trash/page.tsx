import Window from "@/components/Window";
import { TrashIcon } from "@/components/icons";

export default function TrashPage() {
  return (
    <Window title="Trash" width={340} x={130} y={90}>
      <div className="trash">
        <div className="trash-icon">
          <TrashIcon />
        </div>
        <p>The trash is empty.</p>
      </div>
    </Window>
  );
}