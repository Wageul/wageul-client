"use client";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-grey-2">
      {/* <div className="w-[320px] h-[309px] bg-grey-2"> */}
      <div>
        <Carousel setApi={setApi} className="relative w-full h-[309px]">
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="relative flex h-[309px] items-center justify-center p-6 rounded-[20px] overflow-hidden">
                  <Image
                    src="/main.avif"
                    fill={true}
                    alt="thumbnail"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute mb-[13px] flex justify-center gap-[3px] bottom-0 w-full">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={`size-1.5 rounded-full ${
                  index + 1 === current ? "bg-primary-red" : "bg-grey-4"
                }`}
              ></div>
            ))}
          </div>
        </Carousel>
      </div>
      <section className="mt-2.5">
        <div className="px-[8px] py-[16px] bg-background rounded-[16px] text-h2 text-center">
          Going to a cart bar like a Korean office worker!
        </div>
        <div className="px-[22px] py-[21px] bg-background rounded-[16px] space-y-2.5">
          <div className="flex gap-3">
            <LocationOnOutlinedIcon fontSize="medium" />
            <div className="text-body1">
              <span>Seoul Gangnamgu</span>
            </div>
          </div>
          <div className="flex gap-3">
            <CalendarMonthOutlinedIcon fontSize="medium" />
            <div className="text-body1 flex items-center gap-[7px]">
              <span>2024.06.21</span>
              <div className="size-[6px] bg-foreground rounded-full"></div>
              <span>12:00 am</span>
            </div>
          </div>
        </div>
        <div className="px-[22px] py-[21px] bg-background rounded-[16px]">
          <div className="text-body1">Detail</div>
          <div className="mt-[12px] text-subtitle">
            한국에서 로컬 맛집과 놀거리에 참여하고 한국에서 로컬 맛집과 놀거리에
            참여하고 한국에서 로컬 맛집과 놀거리에 참여하고 한국에서 로컬 맛집과
            놀거리에 참여하고
          </div>
          <div className="mt-[13px]">
            <div className="text-body2 flex gap-[14px]">
              <div className="text-grey-4">Duration</div>
              <div className="text-foreground">2 hours</div>
            </div>
            <div className="text-body2 flex gap-[14px]">
              <div className="text-grey-4">Min expneses</div>
              <div className="text-foreground">10,000 won</div>
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
              <div>5 members</div>
            </div>
            <div className="flex gap-[14px]">
              <div className="text-grey-4">Language</div>
              <div>English</div>
            </div>
            <div className="flex gap-[14px]">
              <div className="text-grey-4">Contact</div>
              <div>pf.kako.com</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}