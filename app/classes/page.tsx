import ClassAtlas from "../../components/ClassAtlas";
import SubpageShell from "../../components/SubpageShell";

export const metadata = {
  title: "Classes and Experiences | Do Well Studio",
  description: "Explore strength, mindfulness, movement and recovery at Do Well Studio.",
};

export default function ClassesPage() {
  return (
    <SubpageShell>
      <main className="sub-main classes-page">
        <ClassAtlas />
      </main>
    </SubpageShell>
  );
}
