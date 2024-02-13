'use client';

import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/lib/actions/event.action';
import { useUploadThing } from '@/lib/uploadthing';
import { ImageUploader } from './ImageUploader';
import { toast } from 'react-hot-toast';

export default function EventForm({ userId, type, event, eventId }) {
  const [files, setFiles] = useState([]);
  const initialValues =
    event && type === 'Update'
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : {
          startDateTime: new Date(),
          endDateTime: new Date(),
        };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader');

  const doSubmit = async values => {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent(
          userId,
          { ...values, imageUrl: uploadedImageUrl },
          '/profile'
        );

        if (newEvent) {
          toast.success('New Event Added');
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        toast.error('Addition Error!');
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
        <div className='form-control'>
          <label htmlFor='title' className='label'>
            Event Title
          </label>
          <input
            id='title'
            type='text'
            className='input input-bordered w-full max-w-xs'
            placeholder='Type event title'
            {...register('title', { required: true })}
          />
          {errors.title?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
              Title is required
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='category' className='label'>
            Category
          </label>
          <select
            id='category'
            {...register('category', { required: true })}
            className='select w-full max-w-xs select-bordered'
          >
            <option value=''> Select Event Category</option>
            <option value='Wellness'>Wellness</option>
            <option value='Social Club'>Social Club</option>
            <option value='Technology'>Technology</option>
          </select>
          {errors.category?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
              Category is required
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='location' className='label'>
            Event Location
          </label>
          <input
            id='location'
            type='text'
            className='input input-bordered w-full max-w-xs'
            placeholder='Physical address or online'
            {...register('location', { required: true })}
          />
          {errors.location?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
              Location is required
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='url' className='label'>
            Event URL
          </label>
          <input
            id='url'
            type='text'
            className='input input-bordered w-full max-w-xs'
            placeholder='Link to your website or social media'
            {...register('url', { required: true })}
          />
          {errors.url?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
              URL is required
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='startDateTime' className='label'>
            Start Date
          </label>
          <Controller
            control={control}
            name='startDateTime'
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                id='startDateTime'
                {...field}
                selected={field.value}
                onChange={date => field.onChange(date)}
                showTimeSelect
                timeInputLabel='Time:'
                dateFormat='MM/dd/yyyy h:mm aa'
                className='input input-bordered w-full max-w-xs'
              />
            )}
          />
          {errors.startDateTime?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
              Start Date is required
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='endDateTime' className='label'>
            End Date
          </label>
          <Controller
            control={control}
            name='endDateTime'
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                id='endDateTime'
                {...field}
                selected={field.value}
                onChange={date => field.onChange(date)}
                showTimeSelect
                timeInputLabel='Time:'
                dateFormat='MM/dd/yyyy h:mm aa'
                className='input input-bordered w-full max-w-xs'
              />
            )}
          />
          {errors.endDateTime?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
              End Date is required
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='description' className='label'>
            Description
          </label>
          <textarea
            rows='10'
            id='description'
            className='textarea textarea-bordered w-full'
            placeholder='Your description here'
            {...register('description', { required: true })}
          ></textarea>
          {errors.description?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
              Description is required
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='imageUrl' className='label'>
            Event Image
          </label>
          <Controller
            name='imageUrl'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ImageUploader
                onFieldChange={field.onChange}
                imageUrl={field.value}
                setFiles={setFiles}
              />
            )}
          />
          {errors.imageUrl?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
              Event Image is required
            </p>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='btn btn-primary mt-4'
      >
        Submit
      </button>
    </form>
  );
}
