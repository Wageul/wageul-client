"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/customSelect";
import { Input } from "@/components/ui/input";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CountingTextArea from "@/components/CountingTextArea";
import CountingTextAreaForForm from "@/components/CountingTextAreaForForm";

{
  /* <Avatar className="size-[40px]">
<AvatarImage src="https://github.com/shadcn.png" />
<AvatarFallback>CN</AvatarFallback>
</Avatar> */
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  nationality: z.string().min(2).max(50),
  introduction: z.string().min(0).max(100),
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

  return (
    <>
      <div className="w-full text-center text-body1 font-semibold">
        Edit profile
      </div>
      <div className="mt-[26px] mb-[28px]">image</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[20px]">
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
              <FormItem className="space-y-[6px]">
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
              <FormItem className="space-y-[11px]">
                <FormLabel className="text-h3 font-semibold">
                  Introduce yourself
                </FormLabel>
                <FormControl>
                  <div>
                    <CountingTextAreaForForm {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={'destructive'} type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
