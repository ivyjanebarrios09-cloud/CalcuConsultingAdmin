"use server";

import admin from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

const db = admin.firestore();

export async function deleteApplicationAction(id: string): Promise<{ success: boolean, error?: string }> {
  try {
    if (!id) {
      throw new Error("Application ID is required.");
    }
    await db.collection("applications").doc(id).delete();
    revalidatePath("/dashboard/applications");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
