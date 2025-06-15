'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    const checkEmailVerification = async () => {
      await auth.currentUser?.reload();

      const user = auth.currentUser;
      if (user?.emailVerified) {
        router.push('/setup-profile');
      } else {
        router.push('/login'); 
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) checkEmailVerification();
      else router.push('/login');
    });

    return () => unsubscribe();
  }, [router]);

  return <p>Verifying your email, please wait...</p>;
}
