import { AboutMe, ProfileHeader, OthersReviewList } from "@/components/Profile";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import {
  authenticateUserAndGetData,
  fetchOtherUserData,
  fetchReviews,
} from "@/lib/data";
import { MyReviewList, UserReview } from "@/components/UserReview";
import { Review } from "@/lib/types";
import GoBackButton from "@/components/GoBackButton";

export default async function Page({ params }: { params: { id: string } }) {
  const { loggedIn, data: userData } = await authenticateUserAndGetData();
  const otherUserData = await fetchOtherUserData(params.id);
  const reviewData = await fetchReviews(Number(params.id));
  let myReview = [] as Review[];
  let othersReview = [] as Review[];
  if (loggedIn) {
    myReview = reviewData.reviews.filter(
      (review) => review.writer.id === userData!.user.id
    );
    othersReview = reviewData.reviews.filter(
      (review) => review.writer.id !== userData!.user.id
    );
  }

  return (
    <BackgroundLayout>
      <GoBackButton href="/experience" />
      <ProfileHeader userWithCountsData={otherUserData} reviewData={reviewData} />
      <AboutMe userData={otherUserData} />
      <section className="mt-[30px]">
        <UserReview
          targetId={params.id}
          loggedIn={loggedIn}
          userData={userData ? userData.user : null}
        />
        <MyReviewList myReviews={myReview} userData={userData ? userData.user : null} />
      </section>
      <OthersReviewList
        othersReview={loggedIn ? othersReview : reviewData.reviews}
      />
    </BackgroundLayout>
  );
}
