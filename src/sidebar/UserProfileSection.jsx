import styles from './UserProfileSection.module.css';
import { UserIcon } from '../icons/icons';

const UserProfileButton = () => {
  const user = undefined;
  /*  For testing purposes:
  user = {
    name: "Lina",
    email: "lina.gaga@gmail.com",
    image: "https://cataas.com/cat",
  };
   */

  return (
    <div className={styles.profileContainer}>
      <div className={styles.imgContainer}>
        {user?.image ? (
          <img
            src={user.image}
            alt="Profile Image"
            className={styles.profileImage}
          />
        ) : (
          <UserIcon className={styles.profileIcon} />
        )}
      </div>
      <div className={styles.profileDetails}>
        <p className={styles.line1}>{user ? `Hi, ${user.name}` : 'Sign-up'}</p>
        <p className={styles.line2}>
          {user ? `Hi, ${user.email}` : 'Or login to existing account'}
        </p>
      </div>
    </div>
  );
};

export default UserProfileButton;
