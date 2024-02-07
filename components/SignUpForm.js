'use client';

import { useState } from 'react';
import { createUser } from '@/lib/actions/user.action';
import { toast } from 'react-hot-toast';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const user = await createUser({
        email: email,
        name: name,
        password: password,
      });

      if (user) {
        toast.success('Sign Up Successful');
      }
    } catch (error) {
      toast.error('Sign Up Failed: This email is already registered');
    }
  };
  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <label className='label' htmlFor='name'>
          Name
        </label>
        <input
          id='name'
          className='input input-bordered w-full'
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='James Weasley'
          required
        />
      </div>
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
      <button className='btn btn-primary btn-block mt-4'>Sign Up</button>
    </form>
  );
}
