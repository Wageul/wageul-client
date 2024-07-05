import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";
import { authenticateUserAndGetData } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Page() {
  const { loggedIn, data } = await authenticateUserAndGetData();
  if(!loggedIn){
    redirect('/');
  }

  return (
    <BackgroundLayout background={"grey"} bottomNav={"yes"}>
      <BottomNav loggedIn={loggedIn} />
    </BackgroundLayout>
  );
}
