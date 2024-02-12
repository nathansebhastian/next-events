import LoginForm from '@/components/LoginForm';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig';
import { redirect } from 'next/navigation';

export default async function Login({ searchParams }) {
  const data = await getServerSession(authConfig);
  if (data !== null) {
    redirect('/profile');
  }
  return (
    <div className='mt-12 mx-auto w-full max-w-[400px] p-4 bg-slate-100'>
      <div className='space-y-2 text-center mb-6'>
        <h1 className='text-3xl font-bold'>Log In</h1>
        <p>Enter Your Login Credentials</p>
      </div>
      <LoginForm callbackUrl={searchParams?.callbackUrl} />
    </div>
  );
}
