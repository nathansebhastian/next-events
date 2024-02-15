'use client';

import Link from 'next/link';
import { deleteEvent } from '@/lib/actions/event.action';
import { formatDateTime } from '@/lib/dateformat';
import Image from 'next/image';

export default function EventCard({ event, userId }) {
  const { _id, imageUrl, title, category, description, startDateTime, organizer } = event;
  return (
    <>
      <div className='card w-full bg-base-100 shadow-xl hover:shadow-2xl'>
        <figure>
          <Image
            src={imageUrl}
            alt='Event Image'
            width={1920}
            height={1268}
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{title}</h2>
          <div className='badge badge-secondary'>{category}</div>
          <p className='text-sm text-gray-700'>{formatDateTime(startDateTime)}</p>
          <p className='text-sm'>{description}</p>
          <div className='card-actions justify-end'>
            {organizer._id === userId ? (
              <>
                <Link
                  href={`/events/${_id}/update`}
                  className='btn btn-primary'
                >
                  Edit
                </Link>
                <button
                  onClick={() =>
                    document.querySelector('#delete_modal').showModal()
                  }
                  className='btn btn-warning'
                >
                  Delete
                </button>
              </>
            ) : (
              <Link href={`/events/${_id}`} className='btn btn-primary'>
                Learn More
              </Link>
            )}
          </div>
        </div>
      </div>
      <dialog id='delete_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Deleting Event</h3>
          <p className='py-4'>Are you sure you want to delete this event?</p>
          <div className='modal-action'>
            <form method='dialog'>
              <button
                onClick={() => deleteEvent(_id)}
                className='btn btn-warning mr-2'
              >
                Delete
              </button>
              <button className='btn btn-secondary'>Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
