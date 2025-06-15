'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { applyActionCode } from 'firebase/auth';

export default function ConfirmEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const oobCode = searchParams.get('oobCode');
    if (!oobCode) {
      setMessage('Invalid verification link.');
      return;
    }

    applyActionCode(auth, oobCode)
      .then(() => {
        setMessage('Email verified successfully! Redirecting...');
        setTimeout(() => router.push('/verify-email'), 3000);
      })
      .catch(() => {
        setMessage('Verification failed or link expired.');
      });
  }, [searchParams, router]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{message}</h1>
    </div>
  );
}
