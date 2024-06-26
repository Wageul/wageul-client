import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

export default function ExperienceCard() {
  return (
    <Link href={"/experience/example"}>
      <div className="relative p-[15px] rounded-[20px] border border-grey-2 bg-background hover:brightness-[0.98]">
        <div className="absolute size-[20px] -top-[5px] left-0 bg-secondary-green rounded-full shadow-green"></div>
        {/* <div className="absolute size-[20px] -top-[5px] left-0 bg-primary-red rounded-full shadow-red"></div> */}
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
    </Link>
  );
}
