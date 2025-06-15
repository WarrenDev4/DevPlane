'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from './ProfileCard.module.css';

export default function ProfileCard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className={styles.card}>
      <img
        src={profile.profilePictureUrl || '/default-profile.png'}
        alt="Profile"
        className={styles.profileImage}
      />

      <h2 className={styles.name}>{profile.firstName} {profile.lastName}</h2>

      {profile.location && <p className={styles.location}>📍 {profile.location}</p>}
      {profile.aboutMe && <p className={styles.about}>{profile.aboutMe}</p>}

      <div className={styles.links}>
        {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank">LinkedIn</a>}
        {profile.githubUrl && <a href={profile.githubUrl} target="_blank">GitHub</a>}
        {profile.websiteUrl && <a href={profile.websiteUrl} target="_blank">Website</a>}
      </div>
    </div>
  );
}
