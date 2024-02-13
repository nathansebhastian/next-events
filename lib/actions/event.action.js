'use server';

import { revalidatePath } from 'next/cache';
import { dbConnect } from '@/lib/dbConnect';
import Event from '@/lib/models/event.model';
import User from '@/lib/models/user.model';

export async function createEvent(userId, event, path) {
  await dbConnect();

  const organizer = await User.findById(userId);
  if (!organizer) throw new Error('Organizer not found');

  const newEvent = await Event.create({
    ...event,
    organizer: userId,
  });
  revalidatePath(path);

  return JSON.parse(JSON.stringify(newEvent));
}
