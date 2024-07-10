import { BackgroundLayout } from "@/components/BackgroundLayout";
import ExperienceCard from "@/components/ExperienceCard";
import { Button } from "@/components/ui/wageulButton";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BottomNav from "@/components/BottomNav";
import {
  authenticateUserAndGetData,
  fetchAllExperience,
  fetchAllParticipants,
  fetchBookmarks,
  fetchUserDataByToken,
} from "@/lib/data";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Link from "next/link";

export default async function Page() {
  const { loggedIn, data: userData } = await authenticateUserAndGetData();
  const experienceListData = await fetchAllExperience();
  const bookmarks = await fetchBookmarks();
  const allParticipantsData = await fetchAllParticipants();
  // console.log("top all participants", allParticipantsData);
  // console.log("top all experience list", experienceListData);
  return (
    <BackgroundLayout
      background={loggedIn ? "white" : "grey"}
      bottomNav={"yes"}
      className="relative"
    >
      {!loggedIn ? (
        <Button
          variant={"white"}
          className="w-[302px] fixed left-1/2 transform -translate-x-1/2 px-[18px] py-[10px] flex justify-between text-primary-red font-normal z-10"
        >
          <div className="text-body2">Join with google</div>
          <EastRoundedIcon fontSize="small" />
        </Button>
      ) : (
        <></>
      )}
      <section className={loggedIn ? "pt-[17px]" : "pt-[57px]"}>
        {loggedIn && userData && (
          <div className="text-h2 font-semibold text-center mb-[17px]">
            <span className="text-primary-red">HELLO</span>, {userData.name}!
          </div>
        )}
        <div className="flex gap-2.5 px-[18px] py-[10px] w-[302px] rounded-full mx-auto shadow-light items-center bg-background">
          <SearchRoundedIcon fontSize="small" />
          <input
            className="w-full outline-none placeholder-grey-3"
            placeholder="Search experience"
          />
        </div>
      </section>
      <section className="mt-[35px]">
        <div className="text-h2 font-semibold">Latest</div>
        <div className="mt-[11px] flex flex-col gap-2.5">
          {experienceListData.map((data, index) => {
            if (data.title === null) return <></>;
            const bookmarked = bookmarks?.some(
              (bookmark) => bookmark.experience.id === data.id
            );
            // console.log("allparticipants", allParticipantsData);
            // console.log(
            //   "allparticipants id",
            //   allParticipantsData[0].experienceId
            // );
            // console.log("experience data", data);
            const participants = allParticipantsData.find(
              (participantsData) => participantsData.experienceId === data.id
            )!.userSimpleProfileList;
            // console.log("participants:", participants);
            return (
              <ExperienceCard
                key={index}
                data={data}
                loggedIn={loggedIn}
                initialBookmark={bookmarked}
                participants={participants ? participants : []}
              />
            );
          })}
        </div>
      </section>
      {loggedIn ? (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-0 max-w-[600px] w-full">
          <Link href={"/experience/create"}>
            <div className="absolute bottom-[109px] right-[21px] size-[73px] flex justify-center items-center rounded-full bg-secondary-red text-primary-red">
              <AddRoundedIcon className="text-[44px]" />
            </div>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <BottomNav loggedIn={loggedIn} />
    </BackgroundLayout>
  );
}
