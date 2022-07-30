import SvgIcon from '../SvgIcon/SvgIcon';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <SvgIcon type="loading" />
      <span>Loading please wait...</span>
    </div>
  );
}
