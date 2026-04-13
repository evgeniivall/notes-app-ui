import { StarFilledIcon } from '../icons/icons';
import styles from './Star.module.css';

function Star() {
  return (
    <div className={styles.star}>
      <StarFilledIcon />
    </div>
  );
}

export default Star;
