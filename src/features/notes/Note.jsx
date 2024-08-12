import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCSSVariable } from '../../utils/helpers';
import { ArrowIcon } from '../../icons/icons';
import { selectFolderById } from '../folders/foldersSlice';
import { getDateTag, getStarTag } from '../tags/systemTags';
import TagsList from '../tags/TagsList';
import styles from './Note.module.css';

const Note = ({ noteData, allTags, selectedTagIds }) => {
  const { title, lastUpdatedDate, isStarred, tagIds, folderId } = noteData;
  const [contentWrapped, setContentWrapped] = useState(false);
  const contentContainerRef = useRef();
  const folder = useSelector((state) => selectFolderById(state, folderId));
  const dateTag = useMemo(() => getDateTag(lastUpdatedDate), [lastUpdatedDate]);
  const userTags = tagIds.map((tagId) =>
    allTags.find((tag) => tag.id === tagId),
  );

  const tags = useMemo(() => {
    let baseTags = userTags.map((tag) => ({
      ...tag,
      isSelected: selectedTagIds?.includes(tag.id.toString()),
    }));
    if (isStarred) {
      baseTags.unshift(getStarTag());
    }

    return contentWrapped ? [dateTag, ...baseTags] : [...baseTags, dateTag];
  }, [userTags, isStarred, contentWrapped, dateTag, selectedTagIds]);

  useEffect(() => {
    const contentContainer = contentContainerRef.current;
    if (!contentContainer) return;

    const checkContentWrapping = () => {
      const containerHeight = contentContainer.getBoundingClientRect().height;
      setContentWrapped(containerHeight > 50);
    };

    const observer = new ResizeObserver(checkContentWrapping);
    observer.observe(contentContainer);

    checkContentWrapping();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.note}>
      <div className={styles.folderIndicatorContainer}>
        <div
          className={styles.folderIndicator}
          style={{ backgroundColor: getCSSVariable(folder?.color || 'grey') }}
        />
      </div>
      <div className={styles.content} ref={contentContainerRef}>
        <div className={styles.title}>{title}</div>
        <TagsList
          tags={tags}
          collapsable={contentWrapped}
          parentContainerRef={contentContainerRef}
        />
      </div>
      <div className={styles.iconContainer}>
        <ArrowIcon className={styles.icon} />
      </div>
    </div>
  );
};

export default Note;
