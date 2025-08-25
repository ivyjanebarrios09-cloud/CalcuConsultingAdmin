import { NextResponse } from 'next/server';
import admin from '@/lib/firebase-admin';

export async function GET() {
  try {
    const listUsersResult = await admin.auth().listUsers(1);
    const hasUsers = listUsersResult.users.length > 0;
    return NextResponse.json({ hasUsers });
  } catch (error) {
    console.error('Error checking for users:', error);
    return NextResponse.json({ error: 'Failed to check for users' }, { status: 500 });
  }
}
