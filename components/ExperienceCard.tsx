import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function ExperienceCard() {
  return (
    <div className="p-[15px] rounded-[20px] border-[1.5px] border-grey-1">
      <div className="flex gap-2.5 items-center">
        <Avatar className="size-[32px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-body1">
          Going to a cart bar like a Korean office work
        </div>
      </div>
      <div className="mt-[15px] text-subtitle flex gap-[17px]">
        <div className="rounded-[12px] overflow-hidden relative w-[95px] h-[93px]">
          <Image
            src={"/main.avif"}
            fill={true}
            alt={"experience"}
            objectFit="cover"
          />
        </div>
        <div>
          <div className="flex gap-2">
            <div className="text-grey-4 w-[40px]">where</div>
            <div>Seoul Gangnamgu</div>
          </div>
          <div className="flex gap-2">
            <div className="text-grey-4 w-[40px]">when</div>
            <div>2024.06.21</div>
          </div>
          <div className="flex gap-2">
            <div className="text-grey-4 w-[40px]">speak</div>
            <div>English</div>
          </div>
          <div className="flex gap-2">
            <div className="text-grey-4 w-[40px]">who</div>
            <div className="flex gap-[6px] items-center">
              <div className="flex flex-row-reverse">
                <Avatar className="size-[18px] -ml-[8px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="size-[18px] -ml-[8px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="size-[18px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>6+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
