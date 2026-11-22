import type { ReactNode } from "react";
import Window from "@/components/Window";
import WelcomeContent from "@/components/WelcomeContent";
import WorkContent from "@/components/WorkContent";
import DiaryContent from "@/components/DiaryContent";
import ArtContent from "@/components/ArtContent";
import FilmsContent from "@/components/FilmsContent";
import FxOptions from "@/components/FxOptions";
import TrashContent from "@/components/TrashContent";
import { WINDOWS, closeBehindHref, closeFocusedHref, go, type Desk, type WinId } from "@/lib/windows";

function Content({ id, desk }: { id: WinId; desk: Desk }) {
  switch (id) {
    case "welcome": return <WelcomeContent desk={desk} />;
    case "work": return <WorkContent />;
    case "blog": return <DiaryContent desk={desk} />;
    case "art": return <ArtContent desk={desk} />;
    case "films": return <FilmsContent desk={desk} />;
    case "settings": return <FxOptions />;
    case "trash": return <TrashContent />;
  }
}

function AppWindow({ id, desk, focused }: { id: WinId; desk: Desk; focused: boolean }) {
  const { title, width, x, y } = WINDOWS[id];
  return (
    <Window
      id={id}
      title={title}
      width={width}
      x={x}
      y={y}
      closeHref={focused ? closeFocusedHref(desk) : closeBehindHref(desk, id)}
      focusHref={focused ? undefined : go(desk, WINDOWS[id].route)}
    >
      <Content id={id} desk={desk} />
    </Window>
  );
}

// Renders the windows behind (from ?open=, bottom to top), then the focused one.
// Detail pages pass their own focused <Window> as children.
export default function WindowStack({ desk, children }: { desk: Desk; children?: ReactNode }) {
  return (
    <>
      {desk.open.map((id) => (
        <AppWindow key={id} id={id} desk={desk} focused={false} />
      ))}
      {desk.current && <AppWindow key={desk.current} id={desk.current} desk={desk} focused />}
      {children}
    </>
  );
}
