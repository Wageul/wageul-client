import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";
import MyExperienceCard from "@/components/MyExperienceCard";
import { authenticateUserAndGetData, fetchBookmarks, fetchParticipations } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Page() {
  const { loggedIn } = await authenticateUserAndGetData();
  if (!loggedIn) {
    redirect("/");
  }

  const scheduled = await fetchParticipations();

  return (
    <BackgroundLayout background={"grey"} bottomNav={"yes"}>
      <div className="text-h2 text-center font-semibold">Upcoming</div>
      <section className="flex flex-col gap-2.5 mt-[30px]">
        {scheduled?.map((scheduled, index) => {
          return (
            <MyExperienceCard
              key={index}
              variants="scheduled"
              cardData={scheduled}
            />
          );
        })}
      </section>
      <BottomNav loggedIn={loggedIn} />
    </BackgroundLayout>
  );
}
