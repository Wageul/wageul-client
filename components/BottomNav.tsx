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

const links = [
  {
    name: "experience",
    href: "/experience",
    activeIcon: <HomeIcon fontSize="large" />,
    icon: <HomeOutlinedIcon fontSize="large" />,
    activeColor: "text-primary-red",
  },
  {
    name: "bookmark",
    href: "/bookmark",
    activeIcon: <BookmarkIcon fontSize="large" />,
    icon: <BookmarkBorderOutlinedIcon fontSize="large" />,
    activeColor: "text-primary-green",
  },
  {
    name: "scheduled",
    href: "/scheduled",
    activeIcon: <PeopleAltIcon fontSize="large" />,
    icon: <PeopleAltOutlinedIcon fontSize="large" />,
    activeColor: "text-primary-blue",
  },
  {
    name: "myprofile",
    href: "/user/myprofile",
    activeIcon: <AccountCircleIcon fontSize="large" />,
    icon: <AccountCircleOutlinedIcon fontSize="large" />,
    activeColor: "text-primary-yellow",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed flex px-[26px] pt-[14px] left-1/2 -translate-x-1/2 bottom-0 max-w-[600px] w-full h-[83px] rounded-t-[20px] bg-background shadow-[0_-4px_10px_0px_rgba(0,0,0,0.05)]">
      {links.map(({ name, href, activeColor, activeIcon, icon }, index) => (
        <Link
          key={name}
          href={href}
          className={`flex flex-1 justify-center ${pathname === href ? activeColor : "text-foreground"}`}
        >
          <div>{pathname === href ? activeIcon : icon}</div>
        </Link>
      ))}
    </nav>
  );
}
