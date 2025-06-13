import styles from './TrendingFeed.module.css';
import Sidebar from '../Sidebar/Sidebar';
import TrendingDashboard from '../TrendingDashboard/TrendingDashboard';

export default function TrendingFeed() {
  return (
    <div className={styles.container}>
      <Sidebar />
    <TrendingDashboard />
    </div>
  );
}