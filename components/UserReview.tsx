"use client";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Button } from "@/components/ui/wageulButton";
import CountingTextArea from "@/components/CountingTextArea";
import CustomAvatar from "@/components/CustomAvatar";
import { useState } from "react";
import { z } from "zod";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReview } from "@/lib/actions";

const ReviewFormSchema = z.object({
  content: z.string().min(0).max(100),
});

type ReviewFormData = z.infer<typeof ReviewFormSchema>;

export default function UserReview({ targetId }: { targetId: string }) {
  const [determinedScore, setDeterminedScore] = useState(5);
  const [realtimeScore, setRealtimeScore] = useState(0);
  const [isScoring, setIsScoring] = useState(false);

  const { handleSubmit, control } = useForm<ReviewFormData>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = async (data: ReviewFormData) => {
    const response = await createReview(
      Number(targetId),
      data.content,
      determinedScore
    );
    console.log("create review response", response);
  };

  return (
    <div className="px-[27px] py-[23px] rounded-[16px] bg-grey-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-body2 font-semibold">Create a review</div>
        <div className="mt-[14px] flex justify-between items-center">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => {
              let style = "cursor-pointer text-grey-3 text-[40px] mx-[-2px] ";
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
          <CustomAvatar className="size-[40px]" src={null} />
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
  );
}
