import type { ImageProps } from "next/image";
import Image from "next/image";
import defaultProfilePic from "@/public/defaultprofile.png";
import { cn } from "@/lib/utils";

export default function CustomAvatar({
  src,
  className,
}: {
  src: null | ImageProps["src"];
  className?: string;
}) {
  let style = "rounded-full overflow-hidden relative ";
  return (
    <div className={cn(style, className)}>
      <Image
        unoptimized
        src={src === null ? defaultProfilePic : src}
        alt="profile"
        fill={true}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
