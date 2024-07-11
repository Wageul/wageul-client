import { AboutMe, ProfileHeader, OthersReviewList } from "@/components/Profile";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import {
  authenticateUserAndGetData,
  fetchOtherUserData,
  fetchReviews,
} from "@/lib/data";
import { MyReviewList, UserReview } from "@/components/UserReview";
import { Review } from "@/lib/types";
import Link from "next/link";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export default async function Page({ params }: { params: { id: string } }) {
  const { loggedIn, data: userData } = await authenticateUserAndGetData();
  const otherUserData = await fetchOtherUserData(params.id);
  const reviewData = await fetchReviews(Number(params.id));
  let myReview = [] as Review[];
  let othersReview = [] as Review[];
  if (loggedIn) {
    myReview = reviewData.reviews.filter(
      (review) => review.writer.id === userData!.id
    );
    othersReview = reviewData.reviews.filter(
      (review) => review.writer.id !== userData!.id
    );
  }

  return (
    <BackgroundLayout>
      <Link href={"/experience"}>
        <div className="absolute flex items-center justify-center z-10 top-[12px] size-[40px] rounded-full bg-background shadow-light">
          <ArrowBackIosNewRoundedIcon fontSize="medium" />
        </div>
      </Link>
      <ProfileHeader userData={otherUserData} reviewData={reviewData} />
      <AboutMe userData={otherUserData} />
      <section className="mt-[30px]">
        <UserReview
          targetId={params.id}
          loggedIn={loggedIn}
          userData={userData}
        />
        <MyReviewList myReviews={myReview} userData={userData} />
      </section>
      <OthersReviewList othersReview={loggedIn ? othersReview : reviewData.reviews} />
    </BackgroundLayout>
  );
}
