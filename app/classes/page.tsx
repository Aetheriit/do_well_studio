import ClassAtlas from "../../components/ClassAtlas";
import SubpageShell from "../../components/SubpageShell";

export const metadata = { title: "Classes | Do Well Studio", description: "Explore eight distinct strength, movement, mindfulness and recovery experiences at Do Well Studio." };

export default function ClassesPage() {
  return <SubpageShell><main className="sub-main classes-page"><ClassAtlas/></main></SubpageShell>;
}
