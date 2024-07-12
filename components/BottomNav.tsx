"use client";

import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/custom-login-dialog";
import { Button } from "./ui/wageulButton";
import Image from "next/image";

const links = [
  {
    name: "experience",
    href: "/experience",
    activeIcon: <HomeIcon fontSize="large" />,
    icon: <HomeOutlinedIcon fontSize="large" />,
    activeColor: "text-primary-red",
    hoverColor: "hover:text-primary-red",
  },
  {
    name: "bookmark",
    href: "/bookmark",
    activeIcon: <BookmarkIcon fontSize="large" />,
    icon: <BookmarkBorderOutlinedIcon fontSize="large" />,
    activeColor: "text-primary-green",
    hoverColor: "hover:text-primary-green",
  },
  {
    name: "scheduled",
    href: "/scheduled",
    activeIcon: <PeopleAltIcon fontSize="large" />,
    icon: <PeopleAltOutlinedIcon fontSize="large" />,
    activeColor: "text-primary-blue",
    hoverColor: "hover:text-primary-blue",
  },
  {
    name: "myprofile",
    href: "/user/myprofile",
    activeIcon: <AccountCircleIcon fontSize="large" />,
    icon: <AccountCircleOutlinedIcon fontSize="large" />,
    activeColor: "text-primary-yellow",
    hoverColor: "hover:text-primary-yellow",
  },
];

export default function BottomNav({ loggedIn }: { loggedIn: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="z-50 fixed flex px-[26px] pt-[14px] left-1/2 -translate-x-1/2 bottom-0 max-w-[600px] w-full h-[83px] rounded-t-[20px] bg-background shadow-[0_-4px_10px_0px_rgba(0,0,0,0.05)]">
      {links.map(({ name, href, activeColor, hoverColor, activeIcon, icon }, index) =>
        name !== "experience" && !loggedIn ? (
          <AlertDialog key={name}>
            <AlertDialogTrigger asChild>
              <div
                className={`cursor-pointer flex flex-1 justify-center ${hoverColor} ${
                  pathname === href ? activeColor : "text-foreground"
                }`}
              >
                <div>{pathname === href ? activeIcon : icon}</div>
              </div>
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
                    href={`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/login/oauth2/authorization/google`}
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
        ) : (
          <Link
            key={name}
            href={href}
            className={`flex flex-1 justify-center ${hoverColor} ${
              pathname === href ? activeColor : "text-foreground"
            }`}
          >
            <div>{pathname === href ? activeIcon : icon}</div>
          </Link>
        )
      )}
    </nav>
  );
}
