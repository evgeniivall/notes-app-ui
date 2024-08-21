import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { CloseIcon, MoreIcon } from '../../icons/icons';
import { getFitTagsCount } from './tagWidthCalcHelpers';
import Tag from './Tag';
import Button from '../../ui/Button';
import styles from './TagsList.module.css';

const TagsList = ({ tags, collapsable = true, parentContainerRef }) => {
  const [showAll, setShowAll] = useState(false);
  const [maxVisibleTags, setMaxVisibleTags] = useState(tags.length);

  const calculateVisibleTags = useCallback(() => {
    if (!collapsable || !parentContainerRef?.current) {
      setMaxVisibleTags(tags.length);
      return;
    }
    const parentContainerWidth = parentContainerRef.current.offsetWidth;
    const fitTagsCount = getFitTagsCount(tags, parentContainerWidth - 32);

    setMaxVisibleTags(fitTagsCount);
  }, [tags, parentContainerRef, collapsable]);

  useLayoutEffect(() => {
    calculateVisibleTags();
  }, [tags, calculateVisibleTags]);

  useEffect(() => {
    const handleResize = () => calculateVisibleTags();
    const parentContainer = parentContainerRef?.current;

    const resizeObserver = new ResizeObserver(handleResize);
    if (parentContainer) resizeObserver.observe(parentContainer);

    return () => {
      if (parentContainer) resizeObserver.unobserve(parentContainer);
    };
  }, [parentContainerRef, calculateVisibleTags]);

  const handleToggleShowAll = (event) => {
    event.stopPropagation();
    setShowAll(!showAll);
  };

  const visibleTags = showAll ? tags : tags.slice(0, maxVisibleTags);
  const hasMoreTags = tags.length > maxVisibleTags;

  return (
    <div className={`${styles.tagsContainer} ${showAll ? styles.showAll : ''}`}>
      {visibleTags.map((tag, index) => (
        <Tag
          key={index}
          name={tag.name}
          style={tag.style}
          icon={tag.icon}
          isSelected={tag.isSelected}
        />
      ))}
      {hasMoreTags && (
        <Button
          type="wired"
          onClick={handleToggleShowAll}
          icon={showAll ? <CloseIcon /> : <MoreIcon />}
        />
      )}
    </div>
  );
};

export default TagsList;
