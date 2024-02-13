import { createUploadthing } from 'uploadthing/next';

import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig';

// uploadBuilder where you can define the route rules
const uploadBuilder = createUploadthing();

// Auth function is to check on server session and return the user session
const auth = async () => {
  const session = await getServerSession(authConfig);
  return session;
}; 

// FileRouter for your app, can contain multiple FileRoutes
export const UTrouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: uploadBuilder({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await auth();

      // If you throw, the user will not be able to upload
      if (!session) throw new Error('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userEmail: session.user?.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for user:', metadata.userEmail);

      console.log('file url', file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userEmail };
    }),
};
