import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Button } from "@/components/ui/wageulButton";
import CountingTextArea from "@/components/CountingTextArea";
import { AboutMe, ProfileHeader, ReviewList } from "@/components/Profile";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <ProfileHeader />
      <div className="mt-[35px] flex justify-center">
        <Link href={'/user/myprofile/edit'}>
          <Button variant={"white"} size={"xl"}>
            Edit profile
          </Button>
        </Link>
      </div>
      <AboutMe />
      <ReviewList />
      {/* <section className="mt-[35px] flex justify-center">
        <div className="text-primary-red">Leave Membership</div>
      </section> */}
    </>
  );
}
