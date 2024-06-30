import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import Carousel from "@/components/Carousel";
import { fetchExperience } from "@/lib/data";
import { formatDateString, formatDuration } from "@/lib/formatters";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchExperience(params.id);
  // console.log(data);

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
  } = data;

  const { dateInDotFormat, timeInFormat } = formatDateString(datetime);
  const durationInHours = formatDuration(duration);

  return (
    <BackgroundLayout background={"grey"}>
      <Carousel />
      <section className="mt-2.5">
        <div className="px-[8px] py-[16px] bg-background rounded-[16px] text-h2 text-center">
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
          <div className="mt-[12px] text-subtitle">{content}</div>
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
              <div className="">Kelly Clarkson</div>
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
            <div className="flex gap-[14px] items-center">
              <Avatar className="size-[46px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-body2">Kelly Clarkson</div>
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
              <div>{contact}</div>
            </div>
          </div>
        </div>
      </section>
    </BackgroundLayout>
  );
}
