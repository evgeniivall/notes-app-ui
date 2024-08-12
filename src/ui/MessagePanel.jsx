import styles from './MessagePanel.module.css';

function MessagePanel({ title, subtitle, imageUrl, button }) {
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt="No notes found" className={styles.image} />
      <div className={styles.textContainer}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
      {button && <div className={styles.btnContainer}>{button}</div>}
    </div>
  );
}

export default MessagePanel;
