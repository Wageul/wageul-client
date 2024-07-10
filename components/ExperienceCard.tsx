"use client";

import CustomAvatar from "@/components/CustomAvatar";
import { formatDateString } from "@/lib/formatters";
import { Experience, Participant } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import { addBookmark, deleteBookmark } from "@/lib/actions";
import { useState } from "react";
import defaultProfilePic from "@/public/defaultprofile.png";

export default function ExperienceCard({
  data,
  loggedIn,
  initialBookmark,
  participants,
}: {
  data: Experience;
  loggedIn: boolean;
  initialBookmark?: boolean;
  participants?: Participant[];
}) {
  // console.log(participants);

  const { dateInDotFormat, timeInFormat } = formatDateString(data.datetime);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(initialBookmark);

  const onBookmark = async () => {
    if (bookmarkLoading) return;
    console.log("onBookmark");

    setBookmarkLoading(true);
    if (!bookmarked) {
      await addBookmark(String(data.id));
      setBookmarked(true);
    } else {
      await deleteBookmark(String(data.id));
      setBookmarked(false);
    }
    setBookmarkLoading(false);
  };

  return (
    <Link href={"/experience/" + data.id}>
      <div className="relative p-[15px] rounded-[20px] border border-grey-2 bg-background hover:brightness-[0.98]">
        {participants && data.limitMember > participants.length ? (
          <div className="absolute size-[20px] -top-[5px] left-0 bg-secondary-green rounded-full shadow-green"></div>
        ) : (
          <div className="absolute size-[20px] -top-[5px] left-0 bg-primary-red rounded-full shadow-red"></div>
        )}
        <div className="flex justify-between">
          <div className="flex gap-2.5 items-center">
            <CustomAvatar
              sizeInPx={32}
              src={
                data.writer.profileImg
                  ? data.writer.profileImg
                  : defaultProfilePic
              }
            />
            <div className="text-body1 [overflow-wrap:anywhere]">
              {data.title}
            </div>
          </div>
          {loggedIn && (
            <button
              className="hover:cursor-pointer hover:text-primary-red flex justify-center items-center"
              onClick={(e) => {
                e.preventDefault();
                onBookmark();
              }}
            >
              {bookmarked ? (
                <BookmarkRoundedIcon />
              ) : (
                <BookmarkBorderRoundedIcon />
              )}
            </button>
          )}
        </div>
        <div className="mt-[15px] text-subtitle flex gap-[17px]">
          <div className="rounded-[12px] overflow-hidden relative w-[95px] h-[93px]">
            <Image
              priority={true}
              src={
                data.exImageList[0] ? data.exImageList[0].image : "/main.avif"
              }
              fill={true}
              sizes="width: 95px"
              alt={"experience"}
              objectFit="cover"
            />
          </div>
          <div>
            <div className="flex gap-2">
              <div className="text-grey-4 w-[40px]">where</div>
              <div>{data.location}</div>
            </div>
            <div className="flex gap-2">
              <div className="text-grey-4 w-[40px]">when</div>
              <div>{dateInDotFormat}</div>
            </div>
            <div className="flex gap-2">
              <div className="text-grey-4 w-[40px]">speak</div>
              <div>{data.language}</div>
            </div>
            <div className="flex gap-2">
              <div className="text-grey-4 w-[40px]">who</div>
              <div className="flex gap-[6px] items-center">
                <div className="flex flex-row-reverse">
                  {participants &&
                    participants.map((participant, index) => {
                      return index > 2 ? (
                        <></>
                      ) : (
                        <CustomAvatar
                          key={index}
                          sizeInPx={18}
                          src={
                            participant.userProfile.profileImg
                              ? participant.userProfile.profileImg
                              : defaultProfilePic
                          }
                          className="-ml-[8px]"
                        />
                      );
                    })}
                </div>
                <div>
                  {participants &&
                    participants.length > 3 &&
                    `${participants.length - 3}+`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
