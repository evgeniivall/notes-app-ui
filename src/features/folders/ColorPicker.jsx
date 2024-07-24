import { useEffect, useState } from 'react';
import ColorBox from './ColorBox';
import styles from './ColorPicker.module.css';

function ColorPicker({ colorOptions, activeColor, onChange }) {
  const [activeColorIndex, setActiveColorIndex] = useState(() => {
    return activeColor
      ? colorOptions.findIndex((color) => color === activeColor)
      : null;
  });

  useEffect(() => {
    if (activeColorIndex !== null && onChange) {
      onChange(colorOptions[activeColorIndex]);
    }
  }, [colorOptions, activeColorIndex, onChange]);

  return (
    <div className={styles.colorPicker}>
      {colorOptions.map((color, index) => {
        return (
          <ColorBox
            color={color}
            key={index}
            isActive={index === activeColorIndex}
            onClick={() => setActiveColorIndex(index)}
          />
        );
      })}
    </div>
  );
}

export default ColorPicker;
