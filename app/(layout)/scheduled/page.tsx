import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";
import MyExperienceCard from "@/components/MyExperienceCard";
import {
  authenticateUserAndGetData,
  fetchBookmarks,
  fetchHosted,
  fetchParticipations,
} from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Page() {
  const { loggedIn } = await authenticateUserAndGetData();
  if (!loggedIn) {
    redirect("/");
  }

  const scheduled = await fetchParticipations();
  const hosted = await fetchHosted();

  return (
    <BackgroundLayout background={"grey"} bottomNav={"yes"}>
      <div className="text-h2 text-center font-semibold">Upcoming</div>
      <section className="flex flex-col gap-2.5 mt-[30px]">
        {hosted?.map((hosted, index) => (
          <MyExperienceCard
            key={index}
            variants="scheduled"
            cardData={hosted}
          />
        ))}
        {scheduled?.map((scheduled, index) => {
          return (
            <MyExperienceCard
              key={index}
              variants="scheduled"
              cardData={scheduled.experience}
            />
          );
        })}
      </section>
      <BottomNav loggedIn={loggedIn} />
    </BackgroundLayout>
  );
}
