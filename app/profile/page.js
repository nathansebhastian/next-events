import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig';
import { getUserByEmail } from '@/lib/actions/user.action';
import UserForm from '@/components/UserForm';
import { getEventsByUser } from '@/lib/actions/event.action';
import EventCard from '@/components/EventCard';

export const metadata = {
  title: 'Profile | Next Events'
};

export default async function Profile() {
  let user = {};
  let events = [];
  let userId;

  const data = await getServerSession(authConfig);
  if (data?.user) {
    user = await getUserByEmail(data.user?.email);
    userId = user._id;
    events = await getEventsByUser(userId);
  }

  return (
    <>
      <div className='py-12 px-4 mx-auto max-w-3xl'>
        <h2 className='mb-4 text-3xl font-bold'>My Profile</h2>
        <UserForm user={user} />
      </div>
      <div className='py-12 px-4 mx-auto max-w-6xl'>
        <h2 className='mb-4 text-3xl font-bold'>My Events</h2>
        <div className='grid lg:grid-cols-3 gap-4 mt-12'>
          {events.map(event => {
            return <EventCard event={event} userId={userId} key={event._id} />;
          })}
        </div>
      </div>
    </>
  );
}
