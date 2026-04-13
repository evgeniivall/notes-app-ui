import { useEffect, useState } from 'react';
import { FolderColor } from '../../types';
import ColorBox from './ColorBox';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  colorOptions: FolderColor[];
  activeColor?: FolderColor;
  onChange?: (color: FolderColor) => void;
}

function ColorPicker({ colorOptions, activeColor, onChange }: ColorPickerProps) {
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(() => {
    return activeColor ? colorOptions.findIndex((color) => color === activeColor) : null;
  });

  useEffect(() => {
    if (activeColorIndex !== null && onChange) {
      onChange(colorOptions[activeColorIndex]);
    }
  }, [colorOptions, activeColorIndex, onChange]);

  return (
    <div className={styles.colorPicker}>
      {colorOptions.map((color, index) => (
        <ColorBox
          color={color}
          key={index}
          isActive={index === activeColorIndex}
          onClick={() => setActiveColorIndex(index)}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
