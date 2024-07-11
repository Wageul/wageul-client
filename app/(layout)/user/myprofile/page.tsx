import { Button } from "@/components/ui/wageulButton";
import { AboutMe, ProfileHeader, OthersReviewList } from "@/components/Profile";
import Link from "next/link";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";
import { authenticateUserAndGetData, fetchReviews } from "@/lib/data";
import { redirect } from "next/navigation";
import { Review, ReviewResponse } from "@/lib/types";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export default async function Page() {
  const { loggedIn, data } = await authenticateUserAndGetData();
  if (!loggedIn) {
    redirect("/");
  }
  let reviewData: ReviewResponse | null = null;
  if (loggedIn) {
    reviewData = await fetchReviews(Number(data?.id));
  }

  return (
    <BackgroundLayout bottomNav={"yes"}>
      <Link href={"/experience"}>
        <div className="absolute flex items-center justify-center z-10 top-[12px] size-[40px] rounded-full bg-background shadow-light">
          <ArrowBackIosNewRoundedIcon fontSize="medium" />
        </div>
      </Link>
      <ProfileHeader userData={data} reviewData={reviewData} />
      <div className="mt-[35px] flex justify-center">
        <Link href={"/user/myprofile/edit"}>
          <Button variant={"white"} size={"xl"}>
            Edit profile
          </Button>
        </Link>
      </div>
      <AboutMe userData={data} />
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
