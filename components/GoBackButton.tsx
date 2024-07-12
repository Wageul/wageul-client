import Link from "next/link";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
export default function GoBackButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <div className="fixed flex items-center justify-center z-10 top-[12px] size-[40px] rounded-full bg-background shadow-light">
        <ArrowBackIosNewRoundedIcon fontSize="medium" />
      </div>
    </Link>
  );
}
