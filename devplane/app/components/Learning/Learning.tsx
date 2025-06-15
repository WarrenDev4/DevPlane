import styles from './Learning.module.css';
import Sidebar from '../Sidebar/Sidebar';
import LearnModule from '../LearnDashboard/LearnDashboard';

export default function Learning() {
  return (
    <div className={styles.container}>
      <Sidebar />
        <LearnModule />
    </div>
  );
}