import styles from "./UserProfileSection.module.css";
import profileImage from "./../lina-img-500px.png"; // Adjust the path as needed

const UserProfileButton = () => {
  return (
    <div className={styles.profileContainer}>
      <img src={profileImage} alt="Profile" className={styles.profileImage} />
      <div className={styles.profileDetails}>
        <h1 className={styles.greeting}>Hi, Lina!</h1>
        <p className={styles.email}>lina.gaga.2727@gmail.com</p>
      </div>
    </div>
  );
};

export default UserProfileButton;
