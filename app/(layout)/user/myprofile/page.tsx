import { Button } from "@/components/ui/wageulButton";
import { AboutMe, ProfileHeader, OthersReviewList } from "@/components/Profile";
import Link from "next/link";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";
import { authenticateUserAndGetData, fetchReviews } from "@/lib/data";
import { redirect } from "next/navigation";
import { Review } from "@/lib/types";

export default async function Page() {
  const { loggedIn, data } = await authenticateUserAndGetData();
  if (!loggedIn) {
    redirect("/");
  }
  let othersReview: Review[] = [];
  if (loggedIn) {
    othersReview = (await fetchReviews(Number(data?.id))).reviews;
  }

  return (
    <BackgroundLayout bottomNav={"yes"}>
      <ProfileHeader userData={data} />
      <div className="mt-[35px] flex justify-center">
        <Link href={"/user/myprofile/edit"}>
          <Button variant={"white"} size={"xl"}>
            Edit profile
          </Button>
        </Link>
      </div>
      <AboutMe userData={data} />
      {loggedIn && othersReview && <OthersReviewList othersReview={othersReview} />}
      {/* <section className="mt-[35px] flex justify-center">
        <div className="text-primary-red">Leave Membership</div>
      </section> */}
      <BottomNav loggedIn={loggedIn} />
    </BackgroundLayout>
  );
}
