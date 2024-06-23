import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Button } from "@/components/ui/wageulButton";
import CountingTextArea from "@/components/CountingTextArea";
import { AboutMe, ProfileHeader, ReviewList } from "@/components/Profile";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <ProfileHeader />
      <div className="mt-[35px] flex justify-center">
        <Button variant={"white"} size={"xl"}>
          Edit profile
        </Button>
      </div>
      <AboutMe />
      <ReviewList />
      <section className="mt-[35px] flex justify-center">
        <div className="text-primary-red">Leave Membership</div>
      </section>
    </>
  );
}
