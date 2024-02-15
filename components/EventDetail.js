'use client';

import Link from 'next/link';
import { deleteEvent } from '@/lib/actions/event.action';
import { FaLocationArrow, FaCalendarAlt } from 'react-icons/fa';
import { formatDateTime } from '@/lib/dateformat';
import Image from 'next/image';

export default function EventDetail({ event, userId }) {
  const {
    title,
    category,
    description,
    imageUrl,
    location,
    startDateTime,
    endDateTime,
    url,
    organizer,
  } = event;
  return (
    <div className='flex flex-wrap md:flex-no-wrap justify-between p-6 mx-auto max-w-6xl'>
      <div className='w-full md:w-1/2 h-90'>
        <Image
          src={imageUrl}
          alt=''
          className='w-full h-full object-cover rounded-l'
          width={1920}
          height={1268}
        />
      </div>
      <div className='w-full md:w-1/2 h-90 bg-slate-100 p-6 rounded-r'>
        <div className='flex flex-col gap-4'>
          <h2 className='font-medium text-3xl'>{title}</h2>
          <div className='badge badge-secondary'>{category}</div>
          <p>
            Organizer:{' '}
            <span className='text-blue-700'>{organizer.firstName}</span>
          </p>
          <div className='flex flex-row items-center text-gray-700'>
            <FaCalendarAlt className='mr-2 text-3xl' />
            <div className='flex flex-col'>
              <p>{formatDateTime(startDateTime)}</p>
              <p>{formatDateTime(endDateTime)}</p>
            </div>
          </div>

          <div className='flex items-center text-gray-700'>
            <FaLocationArrow className='mr-2 text-3xl' /> {location}
          </div>
          <p>{description}</p>
          <a href={url} className='btn btn-accent'>
            Visit Event Website
          </a>
          {organizer._id === userId && (
            <>
              <Link
                href={`/events/${event._id}/update`}
                className='btn btn-primary'
              >
                Edit
              </Link>
              <button
                onClick={() => deleteEvent(event._id, '/profile')}
                className='btn btn-warning'
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
