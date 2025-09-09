"use server";

import admin from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

const db = admin.firestore();

export async function deleteInquiryAction(id: string): Promise<{ success: boolean, error?: string }> {
  try {
    if (!id) {
      throw new Error("Inquiry ID is required.");
    }
    await db.collection("inquiries").doc(id).delete();
    revalidatePath("/dashboard/inquiries");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
