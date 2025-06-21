'use client';

import { useEffect, useState, useRef } from 'react';
import { auth, db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './ProfileCard.module.css';

export default function ProfileCard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const profileInputRef = useRef<any>(null);
  const coverInputRef = useRef<any>(null);

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

  const handleImageUpload = async (e: any, type: 'profile' | 'cover') => {
    const file = e.target.files[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) return;

    const storageRef = ref(storage, `${type}Pictures/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      [type === 'profile' ? 'profilePictureUrl' : 'coverPhotoUrl']: url,
    });

    setProfile((prev: any) => ({
      ...prev,
      [type === 'profile' ? 'profilePictureUrl' : 'coverPhotoUrl']: url,
    }));
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.coverSection}>
        <img
          src={profile.coverPhotoUrl || '/DevPlane Banner.png'}
          alt="Cover"
          className={styles.coverImage}
          onClick={() => coverInputRef.current.click()}
        />
        <input
          type="file"
          ref={coverInputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleImageUpload(e, 'cover')}
        />
        <div className={styles.profileImageWrapper}>
          <img
            src={profile.profilePictureUrl || ''}
            alt="Profile"
            className={styles.profileImage}
            onClick={() => profileInputRef.current.click()}
          />
          <input
            type="file"
            ref={profileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => handleImageUpload(e, 'profile')}
          />
        </div>
      </div>
      <div className={styles.profileSection}>
        <div className={styles.profileDetails}>
          <h2 className={styles.name}>{profile.firstName} {profile.lastName}</h2>
          {profile.aboutMe && <p className={styles.about}>{profile.aboutMe}</p>}
          {profile.location && <p className={styles.location}>📍 {profile.location}</p>}
        </div>
      </div>
    </div>
  );
}
