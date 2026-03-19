import { z } from "zod";

export const invitationSchema = z.object({
  senderName: z.string().min(2, "Name must be at least 2 characters").max(50),
  senderPhone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^\+?[0-9]*$/, "Phone number can only contain digits and a leading +"),
  occasion: z.string().min(1, "Please select an occasion"),
  isCustom: z.boolean().default(false),
  useSuggested: z.boolean().default(true),
  messageAr: z.string().optional(),
  messageEn: z.string().optional()
}).refine((data) => {
  if (data.isCustom) {
    return !!data.messageAr && !!data.messageEn;
  }
  return true;
}, {
  message: "Both Arabic and English messages are required",
  path: ["messageAr"]
});

export const viewerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^\+?[0-9]*$/, "Phone number can only contain digits and a leading +")
});
