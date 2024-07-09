"use client";

import {
  Carousel as C,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CarouselImage } from "@/lib/types";

export default function Carousel({ thumbnails }: { thumbnails: CarouselImage[] }) {
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
    <C setApi={setApi} className="relative w-full h-[309px]">
      <CarouselContent>
        {thumbnails.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative flex h-[309px] items-center justify-center p-6 rounded-[20px] overflow-hidden">
              <Image
                priority={true}
                src={image.image}
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
    </C>
  );
}
