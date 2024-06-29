"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/customSelect";
import { Input } from "@/components/ui/input";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CountingTextArea from "@/components/CountingTextArea";
import CountingTextAreaForForm from "@/components/CountingTextAreaForForm";
import { Button } from "@/components/ui/wageulButton";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useState } from "react";
import Image from "next/image";
import { BackgroundLayout } from "@/components/BackgroundLayout";

{
  /* <Avatar className="size-[40px]">
<AvatarImage src="https://github.com/shadcn.png" />
<AvatarFallback>CN</AvatarFallback>
</Avatar> */
}

const ACCEPTED_FILE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/avif",
  "image/gif",
  "image/webp",
];

const formSchema = z.object({
  profileImage: z
    .instanceof(File, { message: "Image is required" })
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "File must be an image."
    ),
  name: z.string().min(2).max(50),
  nationality: z.string().min(2).max(50),
  introduction: z.string().min(50).max(100),
});

export default function Page({ params }: { params: { id: string } }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [profileImageUrl, setProfileImageUrl] = useState("");

  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    onChange(file);
    if (file) {
      let image = window.URL.createObjectURL(file);
      setProfileImageUrl(image);
    }
  };

  return (
    <BackgroundLayout>
      <div className="w-full text-center text-h3 font-semibold">
        Edit profile
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="mt-[26px] mb-[28px]">
                <div className="flex justify-center">
                  <div className="size-[112px] bg-grey-2 rounded-full relative">
                    {profileImageUrl && (
                      <div className="size-[112px] rounded-full overflow-hidden relative">
                        <Image
                          src={profileImageUrl}
                          fill={true}
                          alt={"experience"}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <FormLabel
                      htmlFor="profileImage"
                      className="absolute right-1 -bottom-[14px] bg-background size-[42px] rounded-full p-[3px] hover:cursor-pointer"
                    >
                      <div className="flex justify-center items-center bg-primary-yellow rounded-full size-[36px]">
                        <CameraAltOutlinedIcon
                          fontSize="small"
                          className="text-black"
                        />
                      </div>
                    </FormLabel>
                    <label htmlFor="profileImage"></label>
                  </div>
                </div>
                <FormControl>
                  <input
                    {...fieldProps}
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={(e) => {
                      handleProfileImageChange(e, onChange);
                    }}
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-[6px]">
                <FormLabel className="text-body2 font-normal">Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <EditOutlinedIcon
                      className="absolute top-1/2 -translate-y-1/2 right-[22px]"
                      fontSize="small"
                    />
                    <input
                      className="flex h-10 w-full rounded-[10px] bg-background px-3 pl-2 pr-[46px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-yellow focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 border border-grey-2"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem className="space-y-[6px] mt-[20px]">
                <FormLabel className="text-body2 font-normal">
                  Nationality
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="focus:ring-primary-yellow focus:ring-offset-0 focus:ring-1 rounded-[12px]">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-[12px]">
                    <SelectItem
                      className="focus:bg-secondary-yellow text-body2 font-normal rounded-[12px]"
                      value="m@example.com"
                    >
                      m@example.com
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-secondary-yellow text-body2 font-normal rounded-[12px]"
                      value="m@google.com"
                    >
                      m@google.com
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-secondary-yellow text-body2 font-normal rounded-[12px]"
                      value="m@support.com"
                    >
                      m@support.com
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-secondary-yellow text-body2 font-normal rounded-[12px]"
                      value="m@support.com"
                    >
                      m@support.com
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-secondary-yellow text-body2 font-normal rounded-[12px]"
                      value="m@support.com"
                    >
                      m@support.com
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="introduction"
            render={({ field }) => (
              <FormItem className="space-y-[11px] mt-[20px]">
                <FormLabel className="text-body1 font-semibold">
                  Introduce yourself
                </FormLabel>
                <FormControl>
                  <div>
                    <CountingTextAreaForForm
                      placeholder="Please enter your self-introduction. (You must enter at least 50 characters to join the experience.)"
                      variant="profile"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"primaryYellow"}
            type={"submit"}
            size={"lg"}
            textStyle={"body1"}
            className="mt-[32px] self-center"
          >
            complete
          </Button>
        </form>
      </Form>
    </BackgroundLayout>
  );
}
