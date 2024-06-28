"use client";

import { BackgroundLayout } from "@/components/BackgroundLayout";
import { Button } from "@/components/ui/wageulButton";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import CountingTextAreaForForm from "@/components/CountingTextAreaForForm";

export default function Page() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    location: z.string().min(2).max(50),
    date: z.date({ required_error: "A date is required." }),
    hour: z.string().min(2).max(50),
    minute: z.string().min(2).max(50),
    detail: z.string().min(2).max(50),
    duration: z.string().min(2).max(50),
    expense: z.string().min(2).max(50),
    contact: z.string().min(2).max(50),
    participants: z.string().min(2).max(50),
    language: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      hour: "",
      minute: "",
      detail: "",
      duration: "",
      participants: "",
      language: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <BackgroundLayout>
      <div className="fixed top-0 w-full border-x border-grey-2 max-w-[600px] py-3 left-1/2 -translate-x-1/2 bg-background flex justify-center">
        <Link href={"/experience"}>
          <div className="absolute left-[28px] top-1/2 -translate-y-1/2">
            <ArrowBackIosNewOutlinedIcon />
          </div>
        </Link>
        <div className="text-h2">Create experience</div>
      </div>
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <>
                <div className="mt-[60px] px-2 text-h3 font-semibold">
                  Introduce
                </div>
                <div className="mt-[18px] space-y-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-[21px] py-[24px] pl-[24px] pr-[41px] border border-grey-2 rounded-[16px]">
                            <CampaignOutlinedIcon fontSize="large" />
                            <input
                              className="w-full outline-none placeholder-grey-3 text-body2"
                              placeholder="Please enter a title."
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
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-[21px] py-[24px] pl-[24px] pr-[41px] border border-grey-2 rounded-[16px]">
                            <PlaceOutlinedIcon fontSize="large" />
                            <input
                              className="w-full outline-none placeholder-grey-3 text-body2"
                              placeholder="Please enter a location."
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
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <button className="w-full text-left font-normal flex items-center border border-grey-2 rounded-[16px] px-[24px] py-[21px] text-body2 gap-[21px] hover:brightness-[0.98] bg-background">
                                <CalendarMonthOutlinedIcon fontSize="large" />
                                {field.value ? (
                                  <div>{format(field.value, "PPP")}</div>
                                ) : (
                                  <div
                                    className={`${
                                      !field.value && "text-grey-3"
                                    }`}
                                  >
                                    Please select a date.
                                  </div>
                                )}
                              </button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const newDate = new Date();
                                newDate.setDate(newDate.getDate() - 1);
                                const yesterday = newDate;
                                return (
                                  date < yesterday ||
                                  date > new Date("2030-01-01")
                                );
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center py-[24px] pl-[24px] pr-[41px] border border-grey-2 rounded-[16px]">
                    <AccessAlarmOutlinedIcon
                      fontSize="large"
                      className="mr-[21px]"
                    />
                    <FormField
                      control={form.control}
                      name="hour"
                      render={({ field }) => (
                        <FormItem className="flex-1 mr-[6px]">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:ring-primary-red focus:ring-offset-0 focus:ring-1 rounded-2.5 px-[13px] py-[10px] h-[40px] border-0 bg-grey-1">
                                <SelectValue placeholder="hour" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2.5">
                              <SelectItem
                                className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                value="m@example.com"
                              >
                                m@example.com
                              </SelectItem>
                              <SelectItem
                                className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                value="m@google.com"
                              >
                                m@google.com
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="minute"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:ring-primary-red focus:ring-offset-0 focus:ring-1 rounded-2.5 px-[13px] py-[10px] h-[40px] border-0 bg-grey-1">
                                <SelectValue placeholder="minute" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2.5">
                              <SelectItem
                                className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                value="m@example.com"
                              >
                                m@example.com
                              </SelectItem>
                              <SelectItem
                                className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                value="m@google.com"
                              >
                                m@google.com
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="detail"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <CountingTextAreaForForm
                            variant="experience"
                            placeholder="Please write down a detailed description of the experience"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-[26px] space-y-[26px]">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-body2 font-normal pl-2.5">
                          Duration
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary-red focus:ring-offset-0 focus:ring-1 rounded-2.5 pl-[24px] pr-[12px] py-[12px] h-[44px]">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2.5">
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@example.com"
                            >
                              m@example.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@google.com"
                            >
                              m@google.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@support.com"
                            >
                              m@support.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="khhan@connect.ust.hk"
                            >
                              khhan@connect.ust.hk
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="khhan@kis.ac"
                            >
                              khhan@kis.ac
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expense"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-body2 font-normal pl-2.5">
                          Min.expense
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary-red focus:ring-offset-0 focus:ring-1 rounded-2.5 pl-[24px] pr-[12px] py-[12px] h-[44px]">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2.5">
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@example.com"
                            >
                              m@example.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@google.com"
                            >
                              m@google.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@support.com"
                            >
                              m@support.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="khhan@connect.ust.hk"
                            >
                              khhan@connect.ust.hk
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="khhan@kis.ac"
                            >
                              khhan@kis.ac
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-body2 font-normal pl-2.5">
                          Contact
                        </FormLabel>
                        <FormControl>
                          <input
                            className="w-full px-6 py-[9px] rounded-[10px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-red focus-visible:ring-offset-0 placeholder-grey-3 text-body2 border border-grey-2 "
                            placeholder="Please leave your contact."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end mt-[18px] pb-[24px]">
                  <Button
                    variant={"primaryBlue"}
                    size={"lg"}
                    textStyle={"body1"}
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="mt-[60px] px-2 text-h3 font-semibold">
                  Set Participants Preferences
                </div>
                <div className="mt-[18px] space-y-2">
                  <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-body2 font-normal pl-2.5">
                          Number of participants
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary-red focus:ring-offset-0 focus:ring-1 rounded-2.5 pl-[24px] pr-[12px] py-[12px] h-[44px]">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2.5">
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@example.com"
                            >
                              m@example.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@google.com"
                            >
                              m@google.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@support.com"
                            >
                              m@support.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="khhan@connect.ust.hk"
                            >
                              khhan@connect.ust.hk
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="khhan@kis.ac"
                            >
                              khhan@kis.ac
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-body2 font-normal pl-2.5">
                          Language
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary-red focus:ring-offset-0 focus:ring-1 rounded-2.5 pl-[24px] pr-[12px] py-[12px] h-[44px]">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2.5">
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@example.com"
                            >
                              m@example.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@google.com"
                            >
                              m@google.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="m@support.com"
                            >
                              m@support.com
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="khhan@connect.ust.hk"
                            >
                              khhan@connect.ust.hk
                            </SelectItem>
                            <SelectItem
                              className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                              value="khhan@kis.ac"
                            >
                              khhan@kis.ac
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="absolute px-[20px] pb-[36px] bottom-0 flex justify-between w-full max-w-[600px] left-1/2 -translate-x-1/2">
                    <Button
                      variant={"grey"}
                      size={"lg"}
                      textStyle={"body1"}
                      onClick={handlePreviousStep}
                    >
                      Back
                    </Button>
                    <Button
                      variant={"primaryBlue"}
                      type={"submit"}
                      size={"lg"}
                      textStyle={"body1"}
                      // className="mt-[32px] self-center"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </>
            )}
          </form>
        </Form>
      </section>
    </BackgroundLayout>
  );
}
