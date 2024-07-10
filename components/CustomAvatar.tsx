import type { ImageProps } from "next/image";
import Image from "next/image";

export default function CustomAvatar({
  sizeInPx,
  src,
  className,
}: {
  sizeInPx: number;
  src: ImageProps["src"];
  className?: string;
}) {
  let style = `size-[${sizeInPx}px] rounded-full overflow-hidden relative `;
  if (className) {
    style = style + className;
  }
  return (
    <div className={style}>
      <Image src={src} alt="profile" fill={true} objectFit="cover" />
    </div>
  );
}
