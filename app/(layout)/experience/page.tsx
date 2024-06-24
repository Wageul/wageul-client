import ExperienceCard from "@/components/ExperienceCard";
import { Button } from "@/components/ui/wageulButton";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default async function Page() {
  return (
    <>
      <Button
        variant={"white"}
        className="w-[302px] fixed left-1/2 transform -translate-x-1/2 px-[18px] py-[10px] flex justify-between text-primary-red font-normal z-10"
      >
        <div className="text-body2">Join with google</div>
        <EastRoundedIcon fontSize="small" />
      </Button>
      <section className="pt-[57px]">
        <div className="flex gap-2.5 px-[18px] py-[10px] w-[302px] rounded-full mx-auto shadow-light items-center">
          <SearchRoundedIcon fontSize="small" />
          <input
            className="w-full outline-none placeholder-grey-3"
            placeholder="Search experience"
          />
        </div>
      </section>
      <section className="mt-[35px]">
        <div className="text-h2 font-semibold">Latest</div>
        <div className="mt-[11px] flex flex-col gap-2.5">
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
        </div>
      </section>
    </>
  );
}
