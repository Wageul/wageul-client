import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";

export default async function Page() {
  return (
    <BackgroundLayout background={"grey"} bottomNav={"yes"}>
      <BottomNav />
    </BackgroundLayout>
  );
}
