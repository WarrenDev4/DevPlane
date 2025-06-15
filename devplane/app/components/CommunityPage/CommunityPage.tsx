import styles from './CommunityPage.module.css';
import Sidebar from '../Sidebar/Sidebar';



export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
}