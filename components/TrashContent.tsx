import { TrashIcon } from "@/components/icons";

export default function TrashContent() {
  return (
    <div className="trash">
      <div className="trash-icon">
        <TrashIcon />
      </div>
      <p>The trash is empty.</p>
    </div>
  );
}
