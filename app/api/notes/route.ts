import dbConnect from '@/lib/db';
import Note from '@/models/Note';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    console.log('📝 Attempting to create note:', body);
    const note = await Note.create(body);
    console.log('✅ Note created successfully:', note);
    return NextResponse.json({ success: true, data: note }, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating note:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
