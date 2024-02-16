import EventForm from '@/components/EventForm';
import { getServerSession } from 'next-auth';
import { getUserByEmail } from '@/lib/actions/user.action';
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig';

export const metadata = {
  title: 'Create Event | Next Events'
};

export default async function CreateEvent() {
  let userId = '';
  const data = await getServerSession(authConfig);
  if (data.user) {
    const user = await getUserByEmail(data.user?.email);
    userId = user._id;
  }

  return (
    <div className='py-12 px-4 mx-auto max-w-3xl'>
      <h2 className='mb-4 text-2xl font-bold'>
        New Event Detail
      </h2>
      <EventForm userId={userId} type='Create' />
    </div>
  );
}
