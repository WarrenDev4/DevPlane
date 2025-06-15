'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        router.push('/setup-profile'); 
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Verify Your Email</h1>
      <p>A verification email has been sent to your inbox. Please click the link to verify your email.</p>
      <p>This page will automatically redirect once your email is verified.</p>
    </div>
  );
}
