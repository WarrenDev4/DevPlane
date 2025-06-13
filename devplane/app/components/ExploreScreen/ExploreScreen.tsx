import styles from './ExploreScreen.module.css';
import Sidebar from '../Sidebar/Sidebar';
import ExploreSearch from '../ExploreSearch/ExploreSearch';

export default function ExploreScreen() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <ExploreSearch />
    </div>
  );
}