import EventForm from '@/components/EventForm';
import { getServerSession } from 'next-auth';
import { getUserByEmail } from '@/lib/actions/user.action';
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig';
import { getEventById } from '@/lib/actions/event.action';
import { redirect } from 'next/navigation';

export default async function UpdateEvent({ params: { id } }) {
  let userId = '';
  const data = await getServerSession(authConfig);
  if (data.user) {
    const user = await getUserByEmail(data.user?.email);
    userId = user._id;
  }

  let event = await getEventById(id);
  if (event.organizer?._id === userId) {
    return (
      <div className='py-12 px-4 mx-auto max-w-3xl'>
        <h2 className='mb-4 text-2xl font-bold'>Update Event Detail</h2>
        <EventForm
          userId={userId}
          type='Update'
          event={event}
          eventId={event._id}
        />
      </div>
    );
  } else {
    redirect('/profile')
  }
}
