import {z} from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters",
  }),
  imageUrl: z.string().min(1, {
    message: "Image not be empty",
  }),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string().min(1, {
    message: "Category not be empty",
  }),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
