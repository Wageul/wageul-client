import { Button } from "@/components/ui/wageulButton";
import { AboutMe, ProfileHeader, OthersReviewList } from "@/components/Profile";
import Link from "next/link";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";
import { authenticateUserAndGetData, fetchReviews } from "@/lib/data";
import { redirect } from "next/navigation";
import { Review, ReviewResponse } from "@/lib/types";
import GoBackButton from "@/components/GoBackButton";

export default async function Page() {
  const { loggedIn, data } = await authenticateUserAndGetData();
  if (!loggedIn) {
    redirect("/");
  }
  let reviewData: ReviewResponse | null = null;
  if (loggedIn) {
    reviewData = await fetchReviews(Number(data?.user.id));
  }

  return (
    <BackgroundLayout bottomNav={"yes"}>
      <GoBackButton href="/experience" />
      <ProfileHeader userWithCountsData={data} reviewData={reviewData} />
      <div className="mt-[35px] flex justify-center">
        <Link href={"/user/myprofile/edit"}>
          <Button variant={"white"} size={"xl"}>
            Edit profile
          </Button>
        </Link>
      </div>
      <AboutMe userData={data ? data.user : null} />
      {loggedIn && reviewData ? (
        <OthersReviewList othersReview={reviewData.reviews} />
      ) : (
        <></>
      )}
      {/* <section className="mt-[35px] flex justify-center">
        <div className="text-primary-red">Leave Membership</div>
      </section> */}
      <BottomNav loggedIn={loggedIn} />
    </BackgroundLayout>
  );
}
