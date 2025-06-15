'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './SetupProfile.module.css';

export default function SetupProfile() {
  const [profileData, setProfileData] = useState({
    aboutMe: '',
    location: '',
    linkedinUrl: '',
    githubUrl: '',
    websiteUrl: '',
    profilePicture: null as File | null,
  });

  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (!user) {
      router.push('/login');
    } else {
      setAuthChecked(true);
    }
  });

    return () => unsubscribe();
}, [router]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (files && files.length > 0) {
      setProfileData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    let profilePictureUrl = '';

    try {
      if (profileData.profilePicture) {
        const imageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(imageRef, profileData.profilePicture);
        profilePictureUrl = await getDownloadURL(imageRef);
      }

      const userProfileData: any = {
        aboutMe: profileData.aboutMe,
        location: profileData.location,
        profilePictureUrl,
        updatedAt: new Date(),
      };

      if (profileData.linkedinUrl) userProfileData.linkedinUrl = profileData.linkedinUrl;
      if (profileData.githubUrl) userProfileData.githubUrl = profileData.githubUrl;
      if (profileData.websiteUrl) userProfileData.websiteUrl = profileData.websiteUrl;

      await setDoc(doc(db, 'users', user.uid), userProfileData, { merge: true });

      router.push('/profile');
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  if (!authChecked) {
    return <p className={styles.loadingText}>Checking authentication...</p>; 
  }

  return (
    <form onSubmit={handleSubmit} className={styles.profileContainer}>
      <h2 className={styles.heading}>Complete your profile</h2>

      <div className={styles.formGroup}>
        <label>Profile Picture</label>
        <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} className={styles.inputField} />
      </div>

      <div className={styles.formGroup}>
        <label>About Me</label>
        <textarea name="aboutMe" placeholder="Tell us about yourself" onChange={handleChange} className={styles.textareaField} required />
      </div>

      <div className={styles.formGroup}>
        <label>Location</label>
        <input name="location" placeholder="e.g. San Francisco, CA" onChange={handleChange} className={styles.inputField} required />
      </div>

      <div className={styles.formGroup}>
        <label>LinkedIn <span style={{ color: '#888' }}>(optional)</span></label>
        <input name="linkedinUrl" placeholder="LinkedIn URL" onChange={handleChange} className={styles.inputField} />
      </div>

      <div className={styles.formGroup}>
        <label>GitHub <span style={{ color: '#888' }}>(optional)</span></label>
        <input name="githubUrl" placeholder="GitHub URL" onChange={handleChange} className={styles.inputField} />
      </div>

      <div className={styles.formGroup}>
        <label>Website <span style={{ color: '#888' }}>(optional)</span></label>
        <input name="websiteUrl" placeholder="Website URL" onChange={handleChange} className={styles.inputField} />
      </div>

      <button type="submit" className={styles.submitButton}>Save Profile</button>
    </form>
  );
}
