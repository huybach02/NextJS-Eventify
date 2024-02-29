"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {eventFormSchema} from "@/lib/validator";
import {eventDefaultValues} from "@/constant";
import Dropdown from "./Dropdown";
import {Textarea} from "@/components/ui/textarea";
import {FileUploader} from "./FileUploader";
import {useState} from "react";
import {MdLocationOn, MdOutlineDateRange, MdLink} from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsCurrencyDollar} from "react-icons/bs";
import {Checkbox} from "../ui/checkbox";
import {VscLoading} from "react-icons/vsc";
import {useUploadThing} from "@/lib/uploadthing";
import {useRouter} from "next/navigation";
import {createEvent, updateEvent} from "@/lib/actions/event.action";
import {IEvent} from "@/lib/database/models/event.model";

type Props = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({userId, type, event, eventId}: Props) => {
  const router = useRouter();

  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
          categoryId: event.category._id,
        }
      : eventDefaultValues;

  const [files, setFiles] = useState<File[]>([]);

  const {startUpload} = useUploadThing("imageUploader");

  // 1. Define your form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
            isFree: !values.price && true,
          },
          userId,
          path: "/profile",
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "Update") {
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
            isFree: !values.price && true,
            _id: eventId,
          },
          path: "/profile",
        });
        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Event title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter title of event"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Enter description of event"
                    {...field}
                    className="textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Thumbnail</FormLabel>
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Event Location</FormLabel>
                <FormControl>
                  <div className="flex-center h-[50px] w-full overflow-hidden rounded-md bg-gray-50 px-4 ">
                    <span>
                      <MdLocationOn size={26} />
                    </span>
                    <Input
                      placeholder="Enter location of event or Online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <div className="flex-center h-[50px] w-full overflow-hidden rounded-md bg-gray-50 px-4 ">
                    <span>
                      <MdOutlineDateRange size={26} />
                    </span>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time: "
                      dateFormat={"dd/MM/yyyy h:mm aa"}
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <div className="flex-center h-[50px] w-full overflow-hidden rounded-md bg-gray-50 px-4 ">
                    <span>
                      <MdOutlineDateRange size={26} />
                    </span>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time: "
                      dateFormat={"dd/MM/yyyy h:mm aa"}
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="flex-center h-[50px] w-full overflow-hidden rounded-md bg-gray-50 px-4 ">
                    <span>
                      <BsCurrencyDollar size={24} />
                    </span>
                    <Input
                      type="number"
                      placeholder="Enter price of event"
                      {...field}
                      className="input-field"
                      min={0}
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm"
                              >
                                Free ticket
                              </label>
                              <Checkbox
                                id="isFree"
                                className="w-5 h-5 border-2"
                                onCheckedChange={field.onChange}
                                checked={field.value}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Event Url</FormLabel>
                <FormControl>
                  <div className="flex-center h-[50px] w-full overflow-hidden rounded-md bg-gray-50 px-4 ">
                    <span>
                      <MdLink size={26} />
                    </span>
                    <Input
                      placeholder="Enter link to event"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size={"lg"}
          disabled={form.formState.isSubmitting}
          className="col-span-2 w-full font-semibold"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-3">
              <span className="animate-spin">
                <VscLoading size={26} />
              </span>
              Submitting...
            </div>
          ) : (
            `${type} Event`
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
