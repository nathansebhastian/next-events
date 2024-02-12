'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LoginForm({ callbackUrl }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res.status === 200) {
      toast.success('Login Successful');
      router.push(callbackUrl ?? '/profile');
    } else {
      if (res.error === 'CredentialsSignin') {
        res.error = 'Wrong Password';
      }
      toast.error(`Login Failed: ${res.error}`);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='flex-1 space-y-6'>
      <div className='space-y-2'>
        <label className='label' htmlFor='email'>
          Email
        </label>
        <input
          id='email'
          className='input input-bordered w-full'
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='email'
          placeholder='Enter your email address'
          required
        />
      </div>
      <div className='space-y-2'>
        <label className='label' htmlFor='password'>
          Password
        </label>
        <input
          id='password'
          className='input input-bordered w-full'
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder='Enter password'
          required
          minLength={6}
        />
      </div>
      <button className='btn btn-primary btn-block mt-4'>Log In</button>
    </form>
  );
}
