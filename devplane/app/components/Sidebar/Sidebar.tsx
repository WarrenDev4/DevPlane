'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import styles from './Sidebar.module.css';

interface UserProfile {
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const navItems = [
    {
      href: '/home',
      label: 'Home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5v9.75a.75.75 0 01-.75.75h-5.25v-6H9v6H3.75a.75.75 0 01-.75-.75V10.5z" />
        </svg>
      ),
    },
    {
      href: '/explore',
      label: 'Explore',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.97 0 9-4.03 9-9S16.97 3 12 3 3 7.03 3 12s4.03 9 9 9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 8l-2.5 6L8 16l2.5-6L16 8z" />
        </svg>
      ),
    },
    {
      href: '/trending',
      label: 'Trending',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
        </svg>
      ),
    },
    {
      href: '/learn',
      label: 'Learn',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="22" height="22">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m0 0c-2.5-1.5-5.5-1.5-8 0V6c2.5-1.5 5.5-1.5 8 0zm0 0c2.5-1.5 5.5-1.5 8 0V6c-2.5-1.5-5.5-1.5-8 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.sidebar}>
      <Link href="/home">
        <img src="/DevPlane Logo (White).png" alt="Logo" width={195} height={52} />
      </Link>

      <div className={styles.navLinks}>
        {/* Nav Links (Signed Out) */}
        {navItems.map(({ href, label, icon }) => (
          <Link key={href} href={href} className={pathname === href ? styles.active : ''}>
            <span style={{ marginRight: '10px', display: 'inline-block', width: '20px' }}>
              {icon}
            </span>
            {label}
          </Link>
        ))}

        {/* Nav Links (Signed In) */}
        {user && profile && (
          <>
            <Link href="/foryou" className={pathname === '/foryou' ? styles.active : ''}>
              <span style={{ marginRight: '10px', display: 'inline-block', width: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5m7.25-7.25H4.75" />
                </svg>
              </span>
              For You
            </Link>

            <Link href="/community" className={pathname === '/community' ? styles.active : ''}>
              <span style={{ marginRight: '10px', display: 'inline-block', width: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
              </svg>
              </span>
              Community
            </Link>

            <Link href="/messages" className={pathname === '/messages' ? styles.active : ''}>
              <span style={{ marginRight: '10px', display: 'inline-block', width: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.29-.973L3 20l1.27-3.81A7.49 7.49 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              Messages
            </Link>

            <Link href="/notifications" className={pathname === '/notifications' ? styles.active : ''}>
              <span style={{ marginRight: '10px', display: 'inline-block', width: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 
                  .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </span>
              Notifications
            </Link>
          </>
        )}
      </div>

      {/* Login/Signup / Settings/Logout Section */}
      {user && profile ? (
        <div className={styles.userSection}>
          <Link href="/profile" className={styles.profileLink}>
            {profile.profilePictureUrl && (
              <img
                src={profile.profilePictureUrl}
                alt="Profile"
                className={styles.profilePic}
              />
            )}
            <span>{profile.firstName} {profile.lastName}</span>
          </Link>
          <Link href="/settings" className={styles.settingsLink}>Settings</Link>
          <button onClick={handleLogout} className={styles.logoutButton}>Log Out</button>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Link href="/login" className={styles.loginLink}>Log In</Link>
          <Link href="/signup" className={styles.signUpLink}>Sign Up</Link>
        </div>
      )}
    </div>
  );
}
