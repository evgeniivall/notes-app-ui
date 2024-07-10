import { useEffect, useState } from "react";
import styles from "./Overlay.module.css";

const Overlay = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div
      className={`${styles.overlay} ${isVisible ? styles.visible : ""}`}
      onClick={onClick}
    ></div>
  );
};

export default Overlay;
