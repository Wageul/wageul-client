import Link from "next/link";
import Image from "next/image";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { Bookmark, Experience, SimpleExperience } from "@/lib/types";
import { dMinus, formatDateString } from "@/lib/formatters";

export default function MyExperienceCard({
  cardData,
  variants,
  numMembers,
}: {
  cardData: SimpleExperience;
  // cardData: Bookmark | Scheduled?;
  variants: "bookmark" | "scheduled";
  numMembers?: number;
}) {
  const { title, location, language, datetime, id, limitMember, exImageList } =
    cardData;

  console.log("cardData", cardData);

  const { dateInDotFormat } = formatDateString(datetime);
  const daysDifference = dMinus(dateInDotFormat);

  return (
    <Link href={`/experience/${id}`}>
      <div className="relative px-[11px] py-[14px] rounded-[16px] border overflow-hidden">
        <div className="z-0">
          <Image
            src={exImageList.length > 0 ? exImageList[0].image : "/main.avif"}
            fill={true}
            alt={"experience"}
            objectFit="cover"
            objectPosition="center"
            className="z-0"
          />
        </div>
        <div className="relative flex justify-between z-10">
          <div
            className={
              "flex justify-center items-center rounded-full px-[10px] py-[3.5px] " +
              (variants === "bookmark" ? "bg-[#DEFDE1]/70" : "bg-[#CEE2FF]/70")
            }
          >
            <span
              className={
                "text-subtitle font-semibold " +
                (variants === "bookmark"
                  ? "text-primary-green"
                  : "text-primary-blue")
              }
            >
              D
              {daysDifference >= 0
                ? `-${daysDifference}`
                : `+${Math.abs(daysDifference)}`}
            </span>
          </div>
          {variants === "bookmark" && (
            <div
              className={
                "flex items-center gap-[9px] bg-background/30 px-1 rounded-[10px] " +
                (numMembers && numMembers >= limitMember
                  ? "text-primary-red"
                  : "text-background")
              }
            >
              <GroupsRoundedIcon />
              <span>
                {numMembers}/{limitMember}
              </span>
            </div>
          )}
        </div>
        <div className="relative mt-[32px] z-10 text-background">
          <div className="text-body1 font-semibold [overflow-wrap:anywhere]">
            {title}
          </div>
          <div className="flex items-center text-subtitle font-normal space-x-[5px]">
            <span>{location}</span>
            <div className="size-[3px] bg-background rounded-full"></div>
            <span>{dateInDotFormat.slice(2)}</span>
            <div className="size-[3px] bg-background rounded-full"></div>
            <span>{language}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
