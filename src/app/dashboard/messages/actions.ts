"use server";

import admin from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

const db = admin.firestore();

export async function deleteMessageAction(id: string): Promise<{ success: boolean, error?: string }> {
  try {
    if (!id) {
      throw new Error("Message ID is required.");
    }
    await db.collection("contacts").doc(id).delete();
    revalidatePath("/dashboard/messages");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
