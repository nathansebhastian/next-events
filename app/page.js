import { getAllEvents } from '@/lib/actions/event.action';
import EventCard from '@/components/EventCard';

export default async function Home({ searchParams }) {
  const query = searchParams?.query;
  const events = await getAllEvents(query);

  return (
    <div className='grid place-items-center w-full'>
      <div className='max-w-6xl w-full py-12 px-4'>
        <h2 className='text-3xl text-center font-bold'>Explore Events</h2>
        <div className='grid lg:grid-cols-3 gap-4 mt-12'>
          {events.map(event => {
            return <EventCard event={event} key={event._id} />;
          })}
        </div>
      </div>
    </div>
  );
}