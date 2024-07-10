"use client";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import Carousel from "@/components/Carousel";
import { formatDateString, formatDuration } from "@/lib/formatters";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import { Button } from "@/components/ui/wageulButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, Experience, Participant, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/custom-login-dialog";
import Image from "next/image";
import {
  addBookmark,
  addParticipant,
  deleteBookmark,
  deleteExperience,
  deleteParticipant,
  deleteParticipantByHost,
} from "@/lib/actions";
import { dateIsPassed } from "@/lib/utils";
import CustomAvatar from "@/components/CustomAvatar";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api";
const TOKEN_INVALID_CODE = 401;

export default function Page({ params }: { params: { id: string } }) {
  const [experienceData, setExperienceData] = useState<Experience>();
  const [userData, setUserData] = useState<{
    loggedIn: boolean;
    data: null | User;
  }>({ loggedIn: false, data: null });
  const [participantsData, setParticipantsData] = useState<Participant[]>();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [refetchParticipants, setRefetchParticipants] = useState(0);
  const [memberToBeDeclined, setMemberToBeDeclined] = useState<{
    participationId: number;
    participantName: string;
  }>();

  useEffect(() => {
    (async () => {
      if (!apiUrl) {
        throw new Error("API URL is not defined");
      }
      try {
        const url = apiUrl + `/experience/${params.id}`;
        console.log(url);
        const response = await fetch(url, {
          method: "GET",
        });
        const data = (await response.json()) as Experience;
        console.log(url, data);
        setExperienceData(data);
      } catch (err) {
        console.error("Server Error:", err);
        throw new Error("Failed to fetch the experience.");
      }
    })();
  }, [params.id]);

  useEffect(() => {
    (async () => {
      if (!apiUrl) {
        throw new Error("API URL is not defined");
      }
      if (userData.loggedIn) {
        try {
          const url = apiUrl + "/bookmark";
          console.log(url);
          const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const data: Bookmark[] = await response.json();
          console.log("bookmarkdata", data);
          const bookmarkExists = data.some(
            (item) => item.experience.id === Number(params.id)
          );
          setBookmarked(bookmarkExists);
        } catch (err) {
          console.error("Server Error:", err);
          throw new Error("Failed to fetch the bookmark.");
        }
      }
    })();
  }, [params.id]);

  useEffect(() => {
    (async () => {
      if (!apiUrl) {
        throw new Error("API URL is not defined");
      }
      try {
        const url = apiUrl + `/participation/experience/${params.id}`;
        console.log(url);
        const response = await fetch(url, {
          method: "GET",
        });
        const data = (await response.json()) as {
          experienceId: string;
          userSimpleProfileList: Participant[];
        };
        console.log(data);

        setParticipantsData(data.userSimpleProfileList);
        if (userData && userData.data !== null) {
          const exists = data.userSimpleProfileList.some(
            (item) => item.userProfile.id === userData.data!.id
          );
          setJoined(exists);
        }
      } catch (err) {
        console.error("Server Error:", err);
        throw new Error("Failed to fetch the participants.");
      }
    })();
  }, [params.id, userData, refetchParticipants]);

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

  let currentUserIsTheHost = false;

  const [dialogState, setDialogState] = useState<
    | "delete-confirmation"
    | "delete-alert"
    | "decline-confirmation"
    | "join-alert"
    | "leave-alert"
    | "full-alert"
  >("delete-confirmation");
  const [dialogIsVisible, setDialogIsVisible] = useState(false);
  const [dialogAnimationClass, setDialogAnimationClass] = useState("");
  const handleDialogShow = () => {
    setDialogIsVisible(true);
    setDialogAnimationClass("animate-in fade-in-0");
  };
  const handleDialogHide = () => {
    setDialogAnimationClass("animate-out fade-out-0");
    setTimeout(() => {
      setDialogIsVisible(false);
    }, 140); // Match the animation-duration
  };
  const router = useRouter();

  const handleJoin = async () => {
    if (!joined) {
      if (participantsData && experienceData) {
        if (participantsData.length + 1 < experienceData.limitMember) {
          const participantData = await addParticipant(params.id);
          console.log("participantData", participantData);
          setRefetchParticipants((prev) => prev + 1);
          setDialogState("join-alert");
          handleDialogShow();
        } else {
          setDialogState("full-alert");
          handleDialogShow();
        }
      } else {
        console.log("missing required data");
      }
    } else {
      // await leave
      if (participantsData) {
        const participant = participantsData.find(
          (participant) => participant.userProfile.id === userData.data?.id
        );
        if (participant) {
          await deleteParticipant(participant.participationId);
          setRefetchParticipants((prev) => prev + 1);
          setDialogState("leave-alert");
          handleDialogShow();
        }
      }
    }
    console.log("submit");
  };

  const onDecline = () => {
    // 멤버 추방
    setDialogState("decline-confirmation");
    handleDialogShow();
  };

  const handleDecline = async () => {
    if (memberToBeDeclined && userData.data) {
      await deleteParticipantByHost(
        memberToBeDeclined?.participationId,
        userData.data?.id
      );
      setRefetchParticipants((prev) => prev + 1);
    } else {
      console.log("no participationId or userId");
    }
  };

  const onBookmark = async () => {
    if (bookmarkLoading) return;
    console.log("onBookmark");

    setBookmarkLoading(true);
    if (!bookmarked) {
      await addBookmark(params.id);
      setBookmarked(true);
    } else {
      await deleteBookmark(params.id);
      setBookmarked(false);
    }
    setBookmarkLoading(false);
  };

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

    if (userData && userData.loggedIn && userData.data) {
      currentUserIsTheHost = userData.data.id === writer.id ? true : false;
    }

    const { dateInDotFormat, timeInFormat } = formatDateString(datetime);
    const durationInHours = formatDuration(duration);

    const handleDelete = async () => {
      await deleteExperience(params.id);
      setDialogState("delete-alert");
      handleDialogShow();
    };

    const dialogs = {
      "delete-confirmation": {
        content: "Are you sure you want to permenantly delete the experience?",
        twoButtons: true,
        buttonContent1: "NO",
        handler1: () => {
          handleDialogHide();
        },
        buttonContent2: "YES",
        handler2: async () => {
          // submit deletion (should include setDialog to alert)
          // and
          handleDialogHide();
          await handleDelete();
        },
      },
      "delete-alert": {
        content: "Experience has been deleted.",
        twoButtons: false,
        buttonContent1: "OK",
        handler1: () => {
          handleDialogHide();
          router.push("/experience");
        },
        buttonContent2: "",
        handler2: () => {},
      },
      "decline-confirmation": {
        content: `Will you decline ${memberToBeDeclined?.participantName}'s attendance?`,
        twoButtons: true,
        buttonContent1: "NO",
        handler1: () => {
          handleDialogHide();
        },
        buttonContent2: "YES",
        handler2: async () => {
          // submit decline
          handleDialogHide();
          await handleDecline();
        },
      },
      "join-alert": {
        content: "You have joined the group!",
        twoButtons: false,
        buttonContent1: "OK",
        handler1: () => {
          handleDialogHide();
        },
        buttonContent2: "",
        handler2: () => {},
      },
      "leave-alert": {
        content: "You have left the group.",
        twoButtons: false,
        buttonContent1: "OK",
        handler1: () => {
          handleDialogHide();
        },
        buttonContent2: "",
        handler2: () => {},
      },
      "full-alert": {
        content:
          "Sorry, this activity is full. Please check back later or try another activity. Thanks for understanding!",
        twoButtons: false,
        buttonContent1: "OK",
        handler1: () => {
          handleDialogHide();
        },
        buttonContent2: "",
        handler2: () => {},
      },
    };

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
                {bookmarked ? (
                  <BookmarkRoundedIcon fontSize="large" />
                ) : (
                  <BookmarkBorderRoundedIcon fontSize="large" />
                )}
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}
        <Carousel thumbnails={experienceData.exImageList} />
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
            <Link href={`/user/${writer.id}`} className="block">
              <div className="mt-3 flex gap-2.5 items-center">
                <CustomAvatar className="size-[54px]" src={writer.profileImg} />
                <div className="text-body2">
                  <div className="font-medium">Host</div>
                  <div className="">{writer.name}</div>
                </div>
              </div>
            </Link>
            <div className="my-4 bg-grey-2 h-[1px] rounded-full"></div>
            <div className="pl-1 space-y-2.5">
              {participantsData?.map((participant, index) => (
                <Link
                  key={index}
                  href={`/user/${participant.userProfile.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-[14px] items-center">
                      <CustomAvatar
                        className="size-[46px]"
                        src={participant.userProfile.profileImg}
                      />
                      <div className="text-body2">
                        {participant.userProfile.name}
                      </div>
                    </div>
                    {currentUserIsTheHost && (
                      <Button
                        variant={"primaryRed"}
                        textStyle={"subtitle2"}
                        className="font-semibold"
                        onClick={() => {
                          setMemberToBeDeclined({
                            participationId: participant.participationId,
                            participantName: participant.userProfile.name,
                          });
                          onDecline();
                        }}
                      >
                        Decline
                      </Button>
                    )}
                  </div>
                </Link>
              ))}
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
              <Button
                variant={"primaryRed"}
                size={"lg"}
                textStyle={"body1"}
                type="button"
                onClick={() => {
                  setDialogState("delete-confirmation");
                  handleDialogShow();
                }}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="fixed left-1/2 -translate-x-1/2 bottom-0 max-w-[600px] w-full">
            {!currentUserIsTheHost &&
              (joined ? (
                <Button
                  className="absolute bottom-[40px] right-[21px]"
                  variant={"primaryRed"}
                  size={"lg"}
                  textStyle={"body1"}
                  onClick={handleJoin}
                >
                  Leave
                </Button>
              ) : userData.loggedIn ? (
                <Button
                  className="absolute bottom-[40px] right-[21px]"
                  variant={"primaryBlue"}
                  size={"lg"}
                  textStyle={"body1"}
                  onClick={handleJoin}
                  disabled={
                    dateIsPassed(datetime) ||
                    (participantsData &&
                      limitMember <= participantsData.length + 1)
                      ? true
                      : false
                  }
                >
                  Join
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="absolute bottom-[40px] right-[21px]"
                      variant={"primaryBlue"}
                      size={"lg"}
                      textStyle={"body1"}
                      type="button"
                      disabled={
                        participantsData &&
                        limitMember <= participantsData.length + 1
                          ? true
                          : false
                      }
                    >
                      Join
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-h2 text-center">
                        Join us for the authentic Korean culture.
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col space-y-2 items-center">
                      <AlertDialogAction asChild>
                        <a
                          href={`${process.env.NEXT_PUBLIC_DEPLOYED_API_URL}/login/oauth2/authorization/google`}
                        >
                          <Button
                            variant={"white"}
                            size={"dialog"}
                            className="text-body1 font-normal border border-primary-yellow py-2 flex gap-0.5"
                          >
                            <Image
                              src={"/web_light_rd_na.svg"}
                              width={34}
                              height={34}
                              alt="google"
                            />
                            <span className="text-foreground">
                              Sign in with google
                            </span>
                          </Button>
                        </a>
                      </AlertDialogAction>
                      <AlertDialogCancel asChild>
                        <div>
                          <Button
                            variant={"white"}
                            size={"dialog"}
                            className="text-body1 font-normal"
                          >
                            No, I&apos;ll do it later
                          </Button>
                        </div>
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
          </div>
          {dialogIsVisible && (
            <div
              className={`fixed inset-0 z-50 bg-foreground/30 ${dialogAnimationClass}`}
            >
              <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[275px] rounded-[20px] flex flex-col bg-background overflow-hidden break-words">
                <div className="px-[24.5px] py-[35px] text-body1 font-semibold text-center">
                  {dialogs[dialogState].content}
                </div>
                <div className="flex divide-x divide-grey-3">
                  <button
                    className="h-[50px] bg-grey-2 flex-1 text-subtitle text-center"
                    type="button"
                    onClick={dialogs[dialogState].handler1}
                  >
                    {dialogs[dialogState].buttonContent1}
                  </button>
                  {dialogs[dialogState].twoButtons && (
                    <button
                      className="h-[50px] bg-grey-2 flex-1 text-subtitle text-center"
                      type="button"
                      onClick={dialogs[dialogState].handler2}
                    >
                      {dialogs[dialogState].buttonContent2}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </BackgroundLayout>
    );
  }
  return <BackgroundLayout background={"grey"}></BackgroundLayout>;
}
