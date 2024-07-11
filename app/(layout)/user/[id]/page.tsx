import { AboutMe, ProfileHeader, ReviewList } from "@/components/Profile";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import { fetchOtherUserData } from "@/lib/data";
import UserReview from "@/components/UserReview";

export default async function Page({ params }: { params: { id: string } }) {
  const otherUserData = await fetchOtherUserData(params.id);

  return (
    <BackgroundLayout>
      <ProfileHeader userData={otherUserData} />
      <AboutMe userData={otherUserData} />
      <section className="mt-[30px]">
        <UserReview targetId={params.id}/>
      </section>
      <ReviewList />
    </BackgroundLayout>
  );
}
