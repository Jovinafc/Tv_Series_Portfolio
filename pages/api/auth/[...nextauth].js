import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId:
        '635752708519-bfi2ep692jd8u2dhnqupvu1vk0fes3fj.apps.googleusercontent.com',
      clientSecret: 'wwJ29ZseXCOYf20X2qNaKJfu',
    }),
  ],
});
