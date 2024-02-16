import SignUpForm from "@/components/SignUpForm";

export const metadata = {
  title: 'Sign Up | Next Events'
};

export default async function SignUp() {
  return (
    <div className='mt-12 mx-auto w-full max-w-[500px] p-4 bg-slate-100'>
      <div className='space-y-2 text-center mb-6'>
        <h1 className='text-3xl font-bold'>Sign Up</h1>
        <p>
          Enter Your Information to Create an Account
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
