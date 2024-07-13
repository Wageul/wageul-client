import { BackgroundLayout } from "@/components/BackgroundLayout";
import { Button } from "@/components/ui/wageulButton";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import BottomNav from "@/components/BottomNav";
import {
  authenticateUserAndGetData,
  fetchAllExperience,
  fetchAllParticipants,
  fetchBookmarks,
} from "@/lib/data";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Link from "next/link";
import Search from "@/components/Search";
import ExperienceList from "@/components/ExperienceList";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const { loggedIn, data: userData } = await authenticateUserAndGetData();
  const experienceListDataSorted = (await fetchAllExperience()).sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return +bDate - +aDate;
  });
  const bookmarks = await fetchBookmarks();
  const allParticipantsData = await fetchAllParticipants();
  // console.log("top all participants", allParticipantsData);
  // console.log("top all experience list", experienceListDataSorted);
  console.log("query", searchParams?.query);
  let filteredExperienceListData;
  if (searchParams && searchParams.query) {
    filteredExperienceListData = experienceListDataSorted.filter((data) =>
      data.title.toLowerCase().includes(searchParams.query!.toLowerCase())
    );
  } else {
    filteredExperienceListData = null;
  }
  return (
    <BackgroundLayout
      background={loggedIn ? "white" : "grey"}
      bottomNav={"yes"}
      className="relative"
    >
      {!loggedIn ? (
        <a
          href={`${process.env.LOCAL_API_URL}/login/oauth2/authorization/google`}
        >
          <Button
            variant={"white"}
            className="w-[302px] fixed left-1/2 transform -translate-x-1/2 px-[18px] py-[10px] flex justify-between text-primary-red font-normal z-10"
          >
            <div className="text-body2">Join with google</div>
            <EastRoundedIcon fontSize="small" />
          </Button>
        </a>
      ) : (
        <></>
      )}
      <section className={loggedIn ? "pt-[17px]" : "pt-[57px]"}>
        {loggedIn && userData && (
          <div className="text-h2 font-semibold text-center mb-[17px]">
            <span className="text-primary-red">HELLO</span>, {userData.user.name}!
          </div>
        )}
        <Search placeholder="Search experience" />
      </section>
      <section className="mt-[35px]">
        <div className="text-h2 font-semibold">
          {searchParams && searchParams.query && filteredExperienceListData
            ? "Searched"
            : "Latest"}
        </div>
        <div className="mt-[11px] flex flex-col gap-2.5">
          {searchParams && searchParams.query && filteredExperienceListData ? (
            <ExperienceList
              loggedIn={loggedIn}
              bookmarks={bookmarks}
              allParticipantsData={allParticipantsData}
              experienceListData={filteredExperienceListData}
            />
          ) : (
            <ExperienceList
              loggedIn={loggedIn}
              bookmarks={bookmarks}
              allParticipantsData={allParticipantsData}
              experienceListData={experienceListDataSorted}
            />
          )}
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
