import Link from "next/link";
import Image from "next/image";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { Bookmark } from "@/lib/types";
import { dMinus, formatDateString } from "@/lib/formatters";

export default function MyExperienceCard({
  cardData,
  variants,
}: {
  cardData: Bookmark;
  // cardData: Bookmark | Scheduled?;
  variants: "bookmark" | "scheduled";
}) {
  const {
    experience: { title, location, language, datetime },
  } = cardData;

  const { dateInDotFormat } = formatDateString(datetime);
  const daysDifference = dMinus(dateInDotFormat);

  return (
    <Link href={"/experience"}>
      <div className="relative px-[11px] py-[14px] rounded-[16px] border overflow-hidden">
        <div className="z-0">
          <Image
            src={"/main.avif"}
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
            <div className="flex items-center gap-[9px] text-background bg-background/30 px-1 rounded-[10px]">
              <GroupsRoundedIcon />
              <span>4/6</span>
            </div>
          )}
        </div>
        <div className="relative mt-[32px] z-10 text-background">
          <div className="text-body1 font-semibold [overflow-wrap:anywhere]">{title}</div>
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
