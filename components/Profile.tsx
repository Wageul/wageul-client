import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { User } from "@/lib/types";

export async function ProfileHeader({ userData } : { userData: User | null }) {
  return (
    <section className="flex flex-col items-center">
      <Avatar className="size-[73px]">
        <AvatarImage src={userData && userData.profileImg ? userData.profileImg! : "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="mt-[15px] text-h2 font-semibold">{userData?.name}</div>
      <div className="mt-[2px] text-body2 font-semibold text-grey-4">
        {userData?.nationality}
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
  );
}

export async function AboutMe({ userData } : { userData: User | null }) {
  return (
    <section className="mt-[35px]">
      <div className="pl-2 text-h3 font-semibold">About me</div>
      <div className="mt-3 text-subtitle">
        {userData?.introduce}
      </div>
      {/* <div className="mt-[9px] flex gap-4">
        <div className="text-body2 text-grey-4">Language</div>
        <div className="text-body2">English, Korean</div>
      </div> */}
    </section>
  );
}

export async function ReviewList() {
  return (
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
              harum doloremque magni, sapiente est nostrum consequuntur libero
              delectus reiciendis quo, quod, quis temporibus soluta ab rerum
              animi perspiciatis totam! Ab?
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
              harum doloremque magni, sapiente est nostrum consequuntur libero
              delectus reiciendis quo, quod, quis temporibus soluta ab rerum
              animi perspiciatis totam! Ab?
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
              harum doloremque magni, sapiente est nostrum consequuntur libero
              delectus reiciendis quo, quod, quis temporibus soluta ab rerum
              animi perspiciatis totam! Ab?
            </p>
          </div>
          <div className="mt-[4px] text-subtitle2 text-grey-4 text-end">
            2024.06.22
          </div>
        </div>
      </div>
    </section>
  );
}
