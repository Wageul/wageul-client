import { Bookmark, Experience, Participant } from "@/lib/types";
import ExperienceCard from "./ExperienceCard";
import {
  authenticateUserAndGetData,
  fetchAllExperience,
  fetchAllParticipants,
  fetchBookmarks,
} from "@/lib/data";
import { ExperienceCardSkeleton } from "./Skeletons";

export default async function ExperienceList({ query }: { query: string }) {
  const { loggedIn } = await authenticateUserAndGetData();
  const [experienceListData, bookmarks, allParticipantsData] =
    await Promise.all([
      fetchAllExperience(),
      fetchBookmarks(),
      fetchAllParticipants(),
    ]);

  const experienceListDataSorted = experienceListData.toSorted((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return +bDate - +aDate;
  });

  // console.log("top all participants", allParticipantsData);
  // console.log("top all experience list", experienceListDataSorted);
  console.log("query", query);
  let experienceList;
  let filteredExperienceListData;
  if (query) {
    filteredExperienceListData = experienceListDataSorted.filter((data) =>
      data.title.toLowerCase().includes(query.toLowerCase())
    );
    experienceList = filteredExperienceListData;
  } else {
    experienceList = experienceListDataSorted;
  }

  return (
    <>
      {experienceList!.map((data, index) => {
        if (data.title === null) return <></>;
        const bookmarked = bookmarks?.some(
          (bookmark) => bookmark.experience.id === data.id
        );

        const participants = allParticipantsData.find(
          (participantsData) => participantsData.experienceId === data.id
        )!.userSimpleProfileList;
        return (
          <ExperienceCard
            key={index}
            data={data}
            loggedIn={loggedIn}
            initialBookmark={bookmarked}
            participants={participants ? participants : []}
          />
          // <ExperienceCardSkeleton key={index}/>
        );
      })}
    </>
  );
}
