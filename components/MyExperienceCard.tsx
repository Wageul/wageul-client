import Link from "next/link";
import Image from "next/image";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

export default function MyExperienceCard({
  variants,
}: {
  variants: "bookmark" | "scheduled";
}) {
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
              D-21
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
          <div className="text-body1 font-semibold">
            Going to a cart bar like a Korean office work
          </div>
          <div className="text-subtitle font-normal">
            Seoul.24.06.21.English
          </div>
        </div>
      </div>
    </Link>
  );
}
