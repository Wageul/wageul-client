import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Button } from "@/components/ui/wageulButton";
import CountingTextArea from "@/components/CountingTextArea";
import { AboutMe, ProfileHeader, ReviewList } from "@/components/Profile";
import { BackgroundLayout } from "@/components/BackgroundLayout";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <BackgroundLayout>
      <ProfileHeader />
      <AboutMe />
      <section className="mt-[30px]">
        <div className="px-[27px] py-[23px] rounded-[16px] bg-grey-1">
          <div className="text-body2 font-semibold">Create a review</div>
          <div className="mt-[14px] flex justify-between items-center">
            <div className="flex">
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
            </div>
            <Button variant={"primaryBlue"} size={"sm"} className="text-[12px]">
              Register
            </Button>
          </div>
          <div className="mt-[16px] flex gap-[15px]">
            <Avatar className="size-[40px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CountingTextArea className="flex-grow" />
          </div>
        </div>
      </section>
      <ReviewList />
    </BackgroundLayout>
  );
}
