import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Button } from "@/components/ui/wageulButton";
import { Textarea } from "@/components/ui/textarea";
export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <section className="flex flex-col items-center">
        <Avatar className="mt-[16px] size-[73px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="mt-[15px] text-h2 font-semibold">Kelly Clarkson</div>
        <div className="mt-[2px] text-body2 font-semibold text-grey-4">
          Los Anageles, CA
        </div>
        <div className="mt-[21px] flex gap-2.5 text-h3">
          <div className="px-3 py-2 flex gap-2.5 rounded-full bg-primary-yellow/25 items-center">
            <div className="rounded-full size-[36px] bg-background flex justify-center items-center">
              <StarRoundedIcon className="text-primary-yellow text-[30px]" />
            </div>
            <div>4</div>
          </div>
          <div className="px-3 py-2 flex gap-2.5 rounded-full bg-primary-red/25 items-center">
            <div className="rounded-full size-[36px] bg-primary-red flex justify-center items-center">
              <CheckRoundedIcon className="text-primary-foreground text-[24px]" />
            </div>
            <div>6</div>
          </div>
        </div>
      </section>
      <div className="mt-[35px] flex justify-center">
        <Button variant={"white"} size={"xl"}>
          Edit profile
        </Button>
      </div>
      <section className="mt-[35px]">
        <div className="pl-2 text-h3 font-semibold">About me</div>
        <div className="mt-3 text-subtitle">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          illum asperiores veniam voluptates. Suscipit quas aut, minus eveniet
          ut placeat mollitia adipisci et tenetur deserunt minima enim magni
          labore cumque!
        </div>
        <div className="mt-[9px] flex gap-4">
          <div className="text-body2 text-grey-4">Language</div>
          <div className="text-body2">English, Korean</div>
        </div>
      </section>
      <section className="mt-[30px]">
        <div className="px-[27px] py-[23px] rounded-[16px] bg-grey-1">
          <div className="text-body2 font-semibold">Create a review</div>
          <div className="mt-[14px] flex justify-between">
            <div className="flex">
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
              <StarRoundedIcon className="text-primary-yellow text-[40px] mx-[-2px]" />
            </div>
            <div>register</div>
          </div>
          <div className="mt-[16px] flex gap-[15px]">
            <Avatar className="size-[40px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Textarea placeholder="How was your trip with this friend?" className="resize-none"></Textarea>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-[30px] pl-2 text-h3 font-semibold">Review</div>
        <div className="mt-3 flex flex-col gap-2">
          <div className="px-[16px] py-[14px] bg-grey-1 rounded-[16px]">
            <div className="flex gap-2.5 items-center">
              <Avatar className="size-[40px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-body2">Kelly Clarkson</div>
            </div>
            <div className="mt-[12px] text-subtitle">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deleniti harum doloremque magni, sapiente est nostrum
                consequuntur libero delectus reiciendis quo, quod, quis
                temporibus soluta ab rerum animi perspiciatis totam! Ab?
              </p>
            </div>
            <div className="mt-[4px] text-subtitle2 text-grey-4 text-end">
              2024.06.22
            </div>
          </div>
          <div className="px-[16px] py-[14px] bg-grey-1 rounded-[16px]">
            <div className="flex gap-2.5 items-center">
              <Avatar className="size-[40px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-body2">Kelly Clarkson</div>
            </div>
            <div className="mt-[12px] text-subtitle">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deleniti harum doloremque magni, sapiente est nostrum
                consequuntur libero delectus reiciendis quo, quod, quis
                temporibus soluta ab rerum animi perspiciatis totam! Ab?
              </p>
            </div>
            <div className="mt-[4px] text-subtitle2 text-grey-4 text-end">
              2024.06.22
            </div>
          </div>
          <div className="px-[16px] py-[14px] bg-grey-1 rounded-[16px]">
            <div className="flex gap-2.5 items-center">
              <Avatar className="size-[40px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-body2">Kelly Clarkson</div>
            </div>
            <div className="mt-[12px] text-subtitle">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deleniti harum doloremque magni, sapiente est nostrum
                consequuntur libero delectus reiciendis quo, quod, quis
                temporibus soluta ab rerum animi perspiciatis totam! Ab?
              </p>
            </div>
            <div className="mt-[4px] text-subtitle2 text-grey-4 text-end">
              2024.06.22
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[35px] flex justify-center">
        <div className="text-primary-red">Leave Membership</div>
      </section>
    </>
  );
}
