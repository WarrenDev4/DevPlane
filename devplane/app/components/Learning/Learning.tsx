import styles from './Learning.module.css';
import Sidebar from '../Sidebar/Sidebar';
import LearnModule from '../LearnModule/LearnModule';
import Learn from '@/app/learn/page';

export default function Learning() {
  return (
    <div className={styles.container}>
      <Sidebar />
    <LearnModule />
    </div>
  );
}