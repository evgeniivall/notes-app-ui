import { useEffect, useState } from 'react';
import styles from './Overlay.module.css';

interface OverlayProps {
  onClick: () => void;
}

const Overlay = ({ onClick }: OverlayProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div
      className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}
      onClick={onClick}
    ></div>
  );
};

export default Overlay;
