import Window from "@/components/Window";
import { TrashIcon } from "@/components/icons";

export default function TrashPage() {
  return (
    <Window title="Trash">
      <div className="trash">
        <div className="trash-icon">
          <TrashIcon />
        </div>
        <p>The trash is empty.</p>
      </div>
    </Window>
  );
}