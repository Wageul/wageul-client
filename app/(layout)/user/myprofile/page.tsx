import { Button } from "@/components/ui/wageulButton";
import { AboutMe, ProfileHeader, ReviewList } from "@/components/Profile";
import Link from "next/link";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";
import { authenticateUserAndGetData } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { loggedIn, data } = await authenticateUserAndGetData();
  if(!loggedIn){
    redirect('/');
  }

  return (
    <BackgroundLayout bottomNav={"yes"}>
      <ProfileHeader />
      <div className="mt-[35px] flex justify-center">
        <Link href={'/user/myprofile/edit'}>
          <Button variant={"white"} size={"xl"}>
            Edit profile
          </Button>
        </Link>
      </div>
      <AboutMe />
      <ReviewList />
      {/* <section className="mt-[35px] flex justify-center">
        <div className="text-primary-red">Leave Membership</div>
      </section> */}
      <BottomNav loggedIn={loggedIn}/>
    </BackgroundLayout>
  );
}
