import styles from './CommunityPage.module.css';
import Sidebar from '../Sidebar/Sidebar';
import CommunityFeed from '../CommunityFeed/CommunityFeed';



export default function CommunityPage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <CommunityFeed/>
    </div>
  );
}