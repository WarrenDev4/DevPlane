import Sidebar from '../Sidebar/Sidebar';
import styles from './MessagePage.module.css';
import MessageTab from '../MessageTab/MessageTab';


export default function MessagePage() {
  return (
    <div className={styles.container}>
      <Sidebar />
    <MessageTab />
    </div>
  );
}