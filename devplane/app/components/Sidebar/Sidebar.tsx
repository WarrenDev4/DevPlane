'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

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
        {navItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`${pathname === href ? styles.active : ''}`}
          >
            <span style={{ marginRight: '10px', display: 'inline-block', width: '20px' }}>
              {icon}
            </span>
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.authButtons}>
        <Link href="/login" className={styles.loginLink}>Log In</Link>
        <Link href="/signup" className={styles.signUpLink}>Sign Up</Link>
      </div>
    </div>
  );
}
