import { BackgroundLayout } from "@/components/BackgroundLayout";
import BottomNav from "@/components/BottomNav";
import { authenticateUserAndGetData } from "@/lib/data";
import { redirect } from "next/navigation";
import MyExperienceCard from "@/components/MyExperienceCard";
import { fetchBookmarks } from "@/lib/data";

export default async function Page() {
  const { loggedIn, data } = await authenticateUserAndGetData();
  if (!loggedIn) {
    redirect("/");
  }

  const bookmarks = await fetchBookmarks();

  return (
    <BackgroundLayout background={"grey"} bottomNav={"yes"}>
      <div className="text-h2 text-center font-semibold">Saved</div>
      <section className="flex flex-col gap-2.5 mt-[30px]">
        {bookmarks?.map((bookmark, index) => (
          <MyExperienceCard key={index} variants="bookmark" cardData={bookmark}/>
        ))}
      </section>
      <BottomNav loggedIn={loggedIn} />
    </BackgroundLayout>
  );
}
