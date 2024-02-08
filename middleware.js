export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/profile', '/events/create', '/events/:id/update'],
};
