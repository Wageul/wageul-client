import { Skeleton } from "./ui/customSkeleton";

export function ExperienceCardSkeleton() {
  return (
    <div className="h-[172px] p-[15px] bg-background border border-grey-2 rounded-[20px] flex flex-col gap-[15px]">
      <div className="flex gap-2.5 items-center">
        <Skeleton className="size-[32px] rounded-full" />
        <Skeleton className="w-[200px] h-[27px] rounded-md" />
      </div>
      <div className="flex gap-[17px]">
        <Skeleton className="size-[95px] rounded-[12px]" />
        <div className="flex flex-col space-y-1.5 justify-center">
          <Skeleton className="w-[90px] h-[17px] rounded-md" />
          <Skeleton className="w-[130px] h-[17px] rounded-md" />
          <Skeleton className="w-[110px] h-[17px] rounded-md" />
          <Skeleton className="w-[60px] h-[17px] rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function ExperienceCardListSkeleton() {
  return (
    <>
      <ExperienceCardSkeleton />
      <ExperienceCardSkeleton />
      <ExperienceCardSkeleton />
      <ExperienceCardSkeleton />
    </>
  );
}
