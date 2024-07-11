import { Bookmark, Experience, Participant } from "@/lib/types";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceList({
  loggedIn,
  experienceListData,
  bookmarks,
  allParticipantsData,
}: {
  loggedIn: boolean;
  experienceListData: Experience[];
  bookmarks: Bookmark[];
  allParticipantsData: {
    experienceId: number;
    userSimpleProfileList: Participant[];
  }[];
}) {
  return (
    <>
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
    </>
  );
}
