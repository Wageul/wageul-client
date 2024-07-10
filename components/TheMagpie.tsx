import magpiePic from "@/public/magpie2.png";
import Image from "next/image";

const contents = {
  bookmarks: {
    title: "No saved experience.",
    description: "Save your favorite experience on home tab.",
  },
  scheduled: {
    title: "No scheduled experience.",
    description: "Join new experience on home tab.",
  },
};

export default function TheMagpie({
  variant,
}: {
  variant: "bookmarks" | "scheduled";
}) {
  return (
    <section className="mt-[124px] flex flex-col items-center">
      <div className="flex items-end gap-[21px]">
        <div className="w-[110px]">
          <Image src={magpiePic} alt="the magpie" />
        </div>
        <div className="flex space-x-[20px] pb-[8px]">
          <div className="size-[5px] rounded-full bg-foreground"></div>
          <div className="size-[5px] rounded-full bg-foreground"></div>
          <div className="size-[5px] rounded-full bg-foreground"></div>
        </div>
      </div>
      <div className="mt-[29px] flex flex-col text-center">
        <div className="text-h2 font-semibold">{contents[variant].title}</div>
        <div className="text-body1">{contents[variant].description}</div>
      </div>
    </section>
  );
}
