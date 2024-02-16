import {
  getEventById,
  getRelatedEventsByCategory,
} from '@/lib/actions/event.action';
import { getUserByEmail } from '@/lib/actions/user.action';
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig';
import { getServerSession } from 'next-auth';
import EventDetail from '@/components/EventDetail';
import EventCard from '@/components/EventCard';

export async function generateMetadata({ params : { id }}) {
  const event = await getEventById(id);
 
  return {
    title: event.title,
  }
}

export default async function SingleEvent({ params: { id } }) {
  const event = await getEventById(id);

  let userId = '';
  const data = await getServerSession(authConfig);
  if (data?.user) {
    const user = await getUserByEmail(data.user?.email);
    userId = user._id;
  }

  const relatedEvents = await getRelatedEventsByCategory(
    event.category,
    event._id
  );

  return (
    <>
      <EventDetail event={event} userId={userId} />
      {relatedEvents.length > 0 && (
        <div className='p-6 pt-4 gap-6 mt-6 max-w-6xl'>
          <h2 className='mb-4 text-3xl font-bold'>Related Events</h2>
          <div className='grid lg:grid-cols-3 gap-4 mt-12'>
            {relatedEvents.map(event => {
              return <EventCard event={event} key={event._id} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
