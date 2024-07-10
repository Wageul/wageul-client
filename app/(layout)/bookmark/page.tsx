import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";
import { authenticateUserAndGetData, fetchAllParticipants } from "@/lib/data";
import { redirect } from "next/navigation";
import MyExperienceCard from "@/components/MyExperienceCard";
import { fetchBookmarks } from "@/lib/data";
import TheMagpie from "@/components/TheMagpie";

export default async function Page() {
  const { loggedIn, data } = await authenticateUserAndGetData();
  if (!loggedIn) {
    redirect("/");
  }

  const bookmarks = await fetchBookmarks();
  const participantsList = await fetchAllParticipants();

  return (
    <BackgroundLayout background={"grey"} bottomNav={"yes"}>
      <div className="text-h2 text-center font-semibold">Saved</div>
      {bookmarks.length > 0 ? (
        <section className="flex flex-col gap-2.5 mt-[30px]">
          {bookmarks?.map((bookmark, index) => {
            const numMembers =
              participantsList.find(
                (participants) =>
                  participants.experienceId === bookmark.experience.id
              )!.userSimpleProfileList.length + 1;
            return (
              <MyExperienceCard
                key={index}
                variants="bookmark"
                cardData={bookmark.experience}
                numMembers={numMembers}
              />
            );
          })}
        </section>
      ) : (
        <TheMagpie variant={"bookmarks"} />
      )}
      <BottomNav loggedIn={loggedIn} />
    </BackgroundLayout>
  );
}
