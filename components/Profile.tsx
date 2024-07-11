import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Review, ReviewResponse, User } from "@/lib/types";
import CustomAvatar from "./CustomAvatar";
import { formatDateString } from "@/lib/formatters";

export async function ProfileHeader({ userData }: { userData: User | null }) {
  return (
    <section className="flex flex-col items-center">
      <CustomAvatar
        className="size-[73px]"
        src={userData && userData.profileImg ? userData.profileImg : null}
      />
      <div className="mt-[15px] text-h2 font-semibold">{userData?.name}</div>
      <div className="mt-[2px] text-body2 font-semibold text-grey-4">
        {userData?.nationality}
      </div>
      <div className="mt-[21px] flex gap-2.5 text-h3">
        <div className="px-3 py-2 flex gap-2.5 rounded-full bg-primary-yellow/25 items-center">
          <div className="rounded-full size-[36px] bg-background flex justify-center items-center">
            <StarRoundedIcon className="text-primary-yellow text-[30px]" />
          </div>
          <div>4</div>
        </div>
        <div className="px-3 py-2 flex gap-2.5 rounded-full bg-primary-red/25 items-center">
          <div className="rounded-full size-[36px] bg-primary-red flex justify-center items-center">
            <CheckRoundedIcon className="text-primary-foreground text-[24px]" />
          </div>
          <div>6</div>
        </div>
      </div>
    </section>
  );
}

export async function AboutMe({ userData }: { userData: User | null }) {
  return (
    <section className="mt-[35px]">
      <div className="pl-2 text-h3 font-semibold">About me</div>
      <div className="mt-3 text-subtitle">{userData?.introduce}</div>
      {/* <div className="mt-[9px] flex gap-4">
        <div className="text-body2 text-grey-4">Language</div>
        <div className="text-body2">English, Korean</div>
      </div> */}
    </section>
  );
}

export async function OthersReviewList({
  othersReview,
}: {
  othersReview: Review[];
}) {
  console.log("reviewDat akjalkj", othersReview);

  return (
    <section className="pb-[60px]">
      <div className="mt-[30px] pl-2 text-h3 font-semibold">Review</div>
      {othersReview.map((review, index) => (
        <div key={index} className="mt-3 flex flex-col gap-2">
          <div className="flex flex-col px-[16px] py-[14px] bg-grey-1 rounded-[16px] gap-2">
            <div className="flex gap-2.5 items-center">
              <CustomAvatar
                className="size-[40px]"
                src={review.writer.profileImg}
              />
              <div className="text-body2">{review.writer.name}</div>
            </div>
            <div className="flex gap-1.5 items-center">
              <div>
                {Array.from({ length: 5 }).map((_, index) => {
                  let style = "text-grey-3 text-[24px] mx-[-2px] ";
                  if (index < review.rate) {
                    style = style + "text-primary-yellow";
                  }
                  return <StarRoundedIcon key={index} className={style}/>;
                })}
              </div>
              <div className="text-subtitle">{review.rate}</div>
            </div>
            <div className="text-subtitle pl-0.5">
              <p>{review.content}</p>
            </div>
            <div className="mt-[4px] text-subtitle2 text-grey-4 text-end">
              {(() => {
                const { dateInDotFormat, timeInFormat } = formatDateString(
                  review.createdAt
                );
                return dateInDotFormat;
              })()}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
