import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const invitationSchema = z.object({
  senderName: z.string().min(2, "errors.nameRequired").max(50),
  senderPhone: z.string().refine(isValidPhoneNumber, {
    message: "errors.phoneInvalid",
  }),
  occasion: z.string().min(1, "errors.occasionRequired"),
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
  message: "errors.messagesRequired",
  path: ["messageAr"]
});

export const viewerSchema = z.object({
  name: z.string().min(2, "errors.nameRequired").max(50),
  phone: z.string().refine(isValidPhoneNumber, {
    message: "errors.phoneInvalid",
  })
});
