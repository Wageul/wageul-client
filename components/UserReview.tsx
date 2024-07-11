"use client";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Button } from "@/components/ui/wageulButton";
import CountingTextArea from "@/components/CountingTextArea";
import CustomAvatar from "@/components/CustomAvatar";
import { useState } from "react";
import { z } from "zod";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReview, deleteReview } from "@/lib/actions";
import { Review, User } from "@/lib/types";
import { formatDateString } from "@/lib/formatters";

const ReviewFormSchema = z.object({
  content: z.string().min(0).max(100),
});

type ReviewFormData = z.infer<typeof ReviewFormSchema>;

export function UserReview({
  loggedIn,
  targetId,
  userData,
}: {
  loggedIn: boolean;
  targetId: string;
  userData: User | null;
}) {
  const [determinedScore, setDeterminedScore] = useState(5);
  const [realtimeScore, setRealtimeScore] = useState(0);
  const [isScoring, setIsScoring] = useState(false);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      content: "",
    },
  });
  const { handleSubmit, control } = form;
  const onSubmit = async (data: ReviewFormData) => {
    const response = await createReview(
      Number(targetId),
      data.content,
      determinedScore
    );
    form.reset({
      content: ""
    })
    console.log("create review response", response);
  };

  return (
    <>
      {loggedIn ? (
        <div className="px-[27px] py-[23px] rounded-[16px] bg-grey-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-body2 font-semibold">Create a review</div>
            <div className="mt-[14px] flex justify-between items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => {
                  let style =
                    "cursor-pointer text-grey-3 text-[40px] mx-[-2px] ";
                  if (isScoring) {
                    if (index < realtimeScore) {
                      style = style + "text-primary-yellow";
                    }
                  } else {
                    if (index < determinedScore) {
                      style = style + "text-primary-yellow";
                    }
                  }
                  return (
                    <StarRoundedIcon
                      key={index}
                      className={style}
                      onMouseEnter={() => {
                        setRealtimeScore(index + 1);
                        setIsScoring(true);
                      }}
                      onMouseLeave={() => {
                        setIsScoring(false);
                      }}
                      onClick={() => {
                        setDeterminedScore(index + 1);
                      }}
                    />
                  );
                })}
              </div>
              <Button
                variant={"primaryBlue"}
                size={"sm"}
                className="text-[12px]"
                type="submit"
              >
                Register
              </Button>
            </div>
            <div className="mt-[16px] flex gap-[15px]">
              <CustomAvatar
                className="size-[40px]"
                src={userData ? userData.profileImg : null}
              />
              <Controller
                control={control}
                name="content"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<ReviewFormData>;
                }) => <CountingTextArea className="flex-grow" {...field} />}
              />
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export function MyReviewList({
  myReviews,
  userData,
}: {
  myReviews: Review[];
  userData: User | null;
}) {
  return (
    <section>
      {myReviews.map((review, index) => {
        return (
          <div
            key={index}
            className="mt-[10px] bg-grey-1 rounded-[16px] py-[23px] px-[27px]"
          >
            <div className="text-body2 font-semibold">My review</div>
            <div className="mt-[14px] flex justify-between items-center">
              <div>
                {Array.from({ length: 5 }).map((_, index) => {
                  let style = "text-grey-3 text-[40px] mx-[-2px] ";
                  if (index < review.rate) {
                    style = style + "text-primary-yellow";
                  }
                  return <StarRoundedIcon key={index} className={style} />;
                })}
              </div>
              <div
                className="cursor-pointer text-subtitle font-semibold text-primary-red border-b border-primary-red w-fit h-fit"
                onClick={async () => {
                  await deleteReview(review.id);
                }}
              >
                delete
              </div>
            </div>
            <div className="mt-[16px]">
              <div className="flex gap-2.5 items-center">
                <CustomAvatar
                  className="size-[40px]"
                  src={userData ? userData.profileImg : null}
                />
                <div className="text-body2">{userData && userData.name}</div>
              </div>
              <div className="text-subtitle pl-0.5 mt-[12px]">
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
        );
      })}
    </section>
  );
}
