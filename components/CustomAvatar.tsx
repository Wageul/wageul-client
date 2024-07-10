import type { ImageProps } from "next/image";
import Image from "next/image";
import defaultProfilePic from "@/public/defaultprofile.png";

export default function CustomAvatar({
  sizeInPx,
  src,
  className,
}: {
  sizeInPx: number;
  src: null | ImageProps["src"];
  className?: string;
}) {
  let style = `size-[${sizeInPx}px] rounded-full overflow-hidden relative `;
  if (className) {
    style = style + className;
  }
  return (
    <div className={style}>
      <Image unoptimized src={src === null ? defaultProfilePic : src} alt="profile" fill={true} objectFit="cover" />
    </div>
  );
}
