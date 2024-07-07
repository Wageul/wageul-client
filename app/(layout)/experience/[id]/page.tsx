"use client";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import Carousel from "@/components/Carousel";
import { formatDateString, formatDuration } from "@/lib/formatters";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import { Button } from "@/components/ui/wageulButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Experience, User } from "@/lib/types";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
const TOKEN_INVALID_CODE = 401;

export default function Page({ params }: { params: { id: string } }) {
  const [experienceData, setExperienceData] = useState<Experience>();
  const [userData, setUserData] = useState<{
    loggedIn: boolean;
    data: null | User;
  }>({ loggedIn: false, data: null });

  useEffect(() => {
    (async () => {
      if (!apiUrl && params.id) {
        throw new Error("API URL is not defined");
      }
      try {
        const url = apiUrl + `/experience/${params.id}`;
        console.log(url);
        const response = await fetch(url, {
          method: "GET",
        });
        const data = (await response.json()) as Experience;
        console.log(data);
        setExperienceData(data);
      } catch (err) {
        console.error("Server Error:", err);
        throw new Error("Failed to fetch the experience.");
      }
    })();
  }, [params.id]);

  useEffect(() => {
    (async () => {
      try {
        // console.log("token:", token);
        const url = apiUrl + "/user";
        console.log("url:", url);
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        console.log("status code:", response.status);
        if (response.status === TOKEN_INVALID_CODE) {
          setUserData({ loggedIn: false, data: null });
          return;
        }

        const data = await response.json();
        console.log("data from client authenticateUserAndGetData", data);
        setUserData({ loggedIn: true, data: data as User });
        return;
      } catch (err) {
        console.error("Server Error:", err);
        throw new Error("Failed to fetch the user.");
      }
    })();
  }, []);

  const onJoinSubmit = async () => {
    // "use server";
    // join 여부에 따라 다른 동작
    console.log("submit");
  };

  const onDecline = async () => {
    // "use server";
    // 멤버 추방
  };

  const onBookmark = async () => {
    // "use server";
    // bookmark
  };

  // const experienceData = await fetchExperienceById(params.id);
  // console.log(experienceData);
  if (experienceData) {
    const {
      title,
      location,
      datetime,
      content,
      duration,
      cost,
      contact,
      limitMember,
      language,
      writer,
    } = experienceData;

    // const { loggedIn, data: userData } = await authenticateUserAndGetData();
    let currentUserIsTheHost = false;
    if (userData && userData.loggedIn && userData.data) {
      currentUserIsTheHost = userData.data.id === writer.id ? true : false;
    }

    let joined = false;

    const { dateInDotFormat, timeInFormat } = formatDateString(datetime);
    const durationInHours = formatDuration(duration);

    return (
      <BackgroundLayout background={"grey"}>
        <Link href={"/experience"}>
          <div className="absolute flex items-center justify-center z-10 top-0 size-[40px] rounded-full bg-background shadow-light">
            <ArrowBackIosNewRoundedIcon fontSize="medium" />
          </div>
        </Link>
        {userData && userData.loggedIn ? (
          <div className="relative">
            <form
              className="absolute z-10 top-[16px] right-[18px]"
              action={onBookmark}
            >
              <button
                className="text-background hover:text-primary-red flex justify-center items-center"
                type="submit"
              >
                <BookmarkBorderRoundedIcon fontSize="large" />
                {/* <BookmarkRoundedIcon fontSize="large" /> */}
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}
        <Carousel />
        <section className="mt-2.5">
          <div className="px-[22px] py-[16px] bg-background rounded-[16px] text-h2 text-center [overflow-wrap:anywhere]">
            {title}
          </div>
          <div className="px-[22px] py-[21px] bg-background rounded-[16px] space-y-2.5">
            <div className="flex gap-3">
              <LocationOnOutlinedIcon fontSize="medium" />
              <div className="text-body1">
                <span>{location}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <CalendarMonthOutlinedIcon fontSize="medium" />
              <div className="text-body1 flex items-center gap-[7px]">
                <span>{dateInDotFormat}</span>
                <div className="size-[6px] bg-foreground rounded-full"></div>
                <span>{timeInFormat}</span>
              </div>
            </div>
          </div>
          <div className="px-[22px] py-[21px] bg-background rounded-[16px]">
            <div className="text-body1">Detail</div>
            <div className="mt-[12px] text-subtitle [overflow-wrap:anywhere]">
              <span>{content}</span>
            </div>
            <div className="mt-[13px]">
              <div className="text-body2 flex gap-[14px]">
                <div className="text-grey-4">Duration</div>
                <div className="text-foreground">
                  {durationInHours}
                  {durationInHours > 5 && "+"} hours
                </div>
              </div>
              <div className="text-body2 flex gap-[14px]">
                <div className="text-grey-4">Min expneses</div>
                <div className="text-foreground">
                  {new Intl.NumberFormat().format(cost)} won
                </div>
              </div>
            </div>
          </div>
          <div className="px-[22px] py-[16px] bg-background rounded-[16px]">
            <div className="text-body1">Members</div>
            <div className="mt-3 flex gap-2.5 items-center">
              <Avatar className="size-[54px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-body2">
                <div className="font-medium">Host</div>
                <div className="">{writer.name}</div>
              </div>
            </div>
            <div className="my-4 bg-grey-2 h-[1px] rounded-full"></div>
            <div className="pl-1 space-y-2.5">
              <div className="flex gap-[14px] items-center">
                <Avatar className="size-[46px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-body2">Kelly Clarkson</div>
              </div>
              <div className="flex gap-[14px] items-center">
                <Avatar className="size-[46px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-body2">Kelly Clarkson</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-[14px] items-center">
                  <Avatar className="size-[46px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-body2">Kelly Clarkson</div>
                </div>
                {currentUserIsTheHost && (
                  <form action={onDecline}>
                    <Button
                      variant={"primaryRed"}
                      textStyle={"subtitle2"}
                      className="font-semibold"
                      type="submit"
                    >
                      Decline
                    </Button>
                  </form>
                )}
              </div>
            </div>
            <div className="mt-[28px] text-body1">Preferences</div>
            <div className="mt-3 space-y-1 text-body2">
              <div className="flex gap-[14px]">
                <div className="text-grey-4">Total</div>
                <div>
                  {limitMember}
                  {limitMember > 9 && "+"} members
                </div>
              </div>
              <div className="flex gap-[14px]">
                <div className="text-grey-4">Language</div>
                <div>{language}</div>
              </div>
              <div className="flex gap-[14px]">
                <div className="text-grey-4">Contact</div>
                <div className="[overflow-wrap:anywhere]">{contact}</div>
              </div>
            </div>
          </div>
          <div className="h-[86px] flex justify-center items-center">
            {currentUserIsTheHost && (
              <Button variant={"primaryRed"} size={"lg"} textStyle={"body1"}>
                Delete
              </Button>
            )}
          </div>
          <form
            className="fixed left-1/2 -translate-x-1/2 bottom-0 max-w-[600px] w-full"
            action={onJoinSubmit}
          >
            {!currentUserIsTheHost &&
              (joined ? (
                <Button
                  className="absolute bottom-[40px] right-[21px]"
                  variant={"primaryRed"}
                  size={"lg"}
                  textStyle={"body1"}
                  type="submit"
                >
                  Leave
                </Button>
              ) : (
                <Button
                  className="absolute bottom-[40px] right-[21px]"
                  variant={"primaryBlue"}
                  size={"lg"}
                  textStyle={"body1"}
                  type="submit"
                >
                  Join
                </Button>
              ))}
          </form>
        </section>
      </BackgroundLayout>
    );
  }

  return <BackgroundLayout background={"grey"}></BackgroundLayout>;
}
