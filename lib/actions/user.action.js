'use server';

import { dbConnect } from '@/lib/dbConnect';
import User from '@/lib/models/user.model';
import bcrypt from 'bcrypt';

export async function createUser(user) {
  await dbConnect();

  const passwordHash = await bcrypt.hash(user.password, 10);

  const newUser = await User.create({
    ...user,
    password: passwordHash
  });
  return JSON.parse(JSON.stringify(newUser));
}