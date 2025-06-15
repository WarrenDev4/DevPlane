import styles from './ProfilePage.module.css';
import Sidebar from '../Sidebar/Sidebar';
import ProfileCard from '../ProfileCard/ProfileCard';


export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <ProfileCard/>
    </div>
  );
}