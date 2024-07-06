"use client";

import { BackgroundLayout } from "@/components/BackgroundLayout";
import { Button } from "@/components/ui/wageulButton";
import { useState } from "react";
import { nullable, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import { format } from "date-fns";
import CountingTextAreaForForm from "@/components/CountingTextAreaForForm";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import Image from "next/image";
import { ACCEPTED_FILE_TYPES, CreateExperienceRequestBody } from "@/lib/types";
import { createExperience, uploadExperienceImages } from "@/lib/actions";
import { expenseList, languageList } from "@/lib/selectionData";
import { formatDateTime } from "@/lib/formatters";

const MAX_IMG_NUM = 3;

const formSchema = z.object({
  title: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  date: z.date({ required_error: "A date is required." }),
  hour: z.string().min(2).max(50),
  minute: z.string().min(2).max(50),
  detail: z.string().min(2).max(100),
  duration: z.string(),
  expense: z.coerce.number(),
  contact: z.string().min(2).max(50),
  participants: z.coerce.number(),
  language: z.string().min(2).max(50),
  images: z.array(
    z.object({
      imgfile: z
        .instanceof(File, { message: "Image is required" })
        .refine(
          (file) => ACCEPTED_FILE_TYPES.includes(file.type),
          "File must be an image."
        )
        .nullable(),
    })
  ),
});

export default function Page({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      hour: "",
      minute: "",
      detail: "",
      duration: "",
      participants: 2,
      language: "",
      images: [{ imgfile: null }],
    },
  });

  const imagesFieldsArray = useFieldArray({
    control: form.control,
    name: "images",
  });

  const {
    fields: imageFilesFields,
    append: appendImageFileField,
    remove: removeImageFileField,
  } = imagesFieldsArray;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    let dateTime = formatDateTime(values.date, values.hour, values.minute);
    let createExperienceRequestBody: CreateExperienceRequestBody = {
      title: values.title,
      location: values.location,
      datetime: dateTime,
      content: values.detail,
      duration: "0" + values.duration + ":00",
      cost: values.expense,
      contact: values.contact,
      limitMember: values.participants,
      language: values.language,
    };
    console.log(createExperienceRequestBody);
    const createdExperience = await createExperience(JSON.parse(JSON.stringify(createExperienceRequestBody)));
    console.log(createdExperience);
    const formData = new FormData();
    if (values.images) {
      formData.append("files[0]", values.images[0].imgfile!);
    }
    formData.append("experienceId", createdExperience.id);
    console.log(formData.get("files[0]"))
    const uploadedImages = await uploadExperienceImages(formData);
  }
  const [imageList, setImageList] = useState<string[]>([]);

  const appendImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    onChange(file);
    if (file) {
      appendImageFileField(
        {
          imgfile: null,
        },
        { shouldFocus: true }
      );
      let image = window.URL.createObjectURL(file);
      setImageList([...imageList, image]);
    }
  };

  const deleteImage = (deleteAt: number) => {
    setImageList(imageList.filter((_, index) => index !== deleteAt));
  };

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
                              {Array.from({
                                length: 24,
                              }).map((_, index) => {
                                const hourValue = `${
                                  index < 10 ? "0" : ""
                                }${index}`;
                                return (
                                  <SelectItem
                                    key={index}
                                    className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                    value={hourValue}
                                  >
                                    {hourValue}
                                  </SelectItem>
                                );
                              })}
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
                              {Array.from({
                                length: 6,
                              }).map((_, index) => (
                                <SelectItem
                                  key={index}
                                  className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                  value={String(index) + "0"}
                                >
                                  {index}0
                                </SelectItem>
                              ))}
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
                  <HorizontalScrollContainer>
                    {imageFilesFields.map(
                      (item, index) =>
                        index < 3 && (
                          <div key={item.id}>
                            <FormField
                              control={form.control}
                              name={`images.${index}.imgfile`}
                              render={({
                                field: { value, onChange, ...fieldProps },
                              }) => (
                                <FormItem>
                                  {index + 1 < imageFilesFields.length && (
                                    <div className="relative size-[120px] rounded-[16px] overflow-hidden border border-grey-2">
                                      <Image
                                        src={imageList[index]}
                                        fill={true}
                                        alt={"experience"}
                                        style={{ objectFit: "cover" }}
                                      />
                                      <div
                                        className="absolute flex justify-center items-center size-[20px] right-[7px] top-[7px] bg-grey-2 hover:cursor-pointer rounded-full"
                                        onClick={() => {
                                          removeImageFileField(index);
                                          deleteImage(index);
                                        }}
                                      >
                                        <CloseRoundedIcon className="text-subtitle" />
                                      </div>
                                    </div>
                                  )}
                                  {index + 1 === imageFilesFields.length && (
                                    <FormLabel htmlFor={`imageFile${index}`}>
                                      <div className="size-[120px] relative border border-grey-2 hover:cursor-pointer rounded-[16px] flex justify-center items-center">
                                        <div className="flex flex-col items-center gap-[14px]">
                                          <div className="relative size-[52px] bg-grey-1 rounded-full flex justify-center items-center">
                                            <CameraAltOutlinedIcon
                                              fontSize="medium"
                                              className="text-black"
                                              fontWeight={"bold"}
                                            />
                                            <div className="flex absolute -bottom-[2px] -right-[3px] size-[20px] justify-center items-center bg-primary-yellow rounded-full text-h3 text-background font-normal">
                                              <span>+</span>
                                            </div>
                                          </div>
                                          <div className="text-grey-3 text-body2">
                                            {index + 1}/{MAX_IMG_NUM}
                                          </div>
                                        </div>
                                      </div>
                                    </FormLabel>
                                  )}
                                  <FormControl>
                                    <input
                                      {...fieldProps}
                                      type="file"
                                      id={`imageFile${index}`}
                                      accept="image/*"
                                      onChange={(e) => {
                                        // appendImage(e);
                                        appendImage(e, onChange);
                                      }}
                                      className="hidden"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )
                    )}
                    {Array.from({
                      length: MAX_IMG_NUM - imageFilesFields.length,
                    }).map((_, index) => (
                      <div
                        key={index}
                        className="size-[120px] flex justify-center items-center border border-grey-2 rounded-[16px]"
                      >
                        <div className="size-[20px] flex justify-center items-center bg-grey-2 rounded-full text-h3 text-background font-normal">
                          <span>+</span>
                        </div>
                      </div>
                    ))}
                  </HorizontalScrollContainer>
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
                              <SelectValue placeholder="Select a duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2.5">
                            {Array.from({
                              length: 6,
                            }).map((_, index) => (
                              <SelectItem
                                key={index}
                                className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                value={String(index + 1)}
                              >
                                {index + 1} hour
                                {index > 0 && "s"}
                                {index === 5 && "+"}
                              </SelectItem>
                            ))}
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
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary-red focus:ring-offset-0 focus:ring-1 rounded-2.5 pl-[24px] pr-[12px] py-[12px] h-[44px]">
                              <SelectValue placeholder="Select an expense" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2.5">
                            {expenseList.map((value, index) => (
                              <SelectItem
                                key={index}
                                className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                value={String(value)}
                              >
                                {new Intl.NumberFormat().format(value)} won
                              </SelectItem>
                            ))}
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
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary-red focus:ring-offset-0 focus:ring-1 rounded-2.5 pl-[24px] pr-[12px] py-[12px] h-[44px]">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2.5">
                            {Array.from({
                              length: 9,
                            }).map((_, index) => (
                              <SelectItem
                                key={index}
                                className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                value={String(index + 2)}
                              >
                                {index + 2}
                                {index + 2 === 10 && "+"}
                              </SelectItem>
                            ))}
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
                            {languageList.map((value, index) => {
                              return (
                                <SelectItem
                                  key={index}
                                  className="focus:bg-secondary-red text-body2 font-normal rounded-2.5"
                                  value={value}
                                >
                                  {value}
                                </SelectItem>
                              );
                            })}
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
