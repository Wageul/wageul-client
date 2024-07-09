"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateString } from "@/lib/formatters";
import { Experience } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import { addBookmark, deleteBookmark } from "@/lib/actions";
import { useState } from "react";

export default function ExperienceCard({
  data,
  loggedIn,
  initialBookmark,
}: {
  data: Experience;
  loggedIn: boolean;
  initialBookmark?: boolean;
}) {

  console.log(data);

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
        <div className="absolute size-[20px] -top-[5px] left-0 bg-secondary-green rounded-full shadow-green"></div>
        {/* <div className="absolute size-[20px] -top-[5px] left-0 bg-primary-red rounded-full shadow-red"></div> */}
        <div className="flex justify-between">
          <div className="flex gap-2.5 items-center">
            <Avatar className="size-[32px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
              src={data.exImageList[0] ? data.exImageList[0].image : '/main.avif'}
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
                  <Avatar className="size-[18px] -ml-[8px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-[18px] -ml-[8px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-[18px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div>6+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
