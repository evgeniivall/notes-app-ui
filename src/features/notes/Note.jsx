import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCSSVariable } from '../../utils/helpers';
import { ArrowIcon } from '../../icons/icons';
import { selectFolderById } from '../folders/foldersSlice';
import { getDateTag, getStarTag } from '../tags/systemTags';
import TagsList from '../tags/TagsList';
import styles from './Note.module.css';
import { selectTagsByNames } from '../tags/tagsSlice';

const Note = ({ noteData, selectedTags, isActive }) => {
  const { id, title, lastUpdatedDate, isStarred, tags, folderId } = noteData;
  const [contentWrapped, setContentWrapped] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contentContainerRef = useRef();
  const folder = useSelector((state) => selectFolderById(state, folderId));
  const dateTag = useMemo(() => getDateTag(lastUpdatedDate), [lastUpdatedDate]);
  const userTags = useSelector((state) => selectTagsByNames(state, tags));

  const tagsList = useMemo(() => {
    let baseTags = userTags.map((tag) => ({
      ...tag,
      isSelected: selectedTags?.includes(tag.name),
    }));
    if (isStarred) {
      baseTags.unshift(getStarTag());
    }

    return contentWrapped ? [dateTag, ...baseTags] : [...baseTags, dateTag];
  }, [userTags, isStarred, contentWrapped, dateTag, selectedTags]);

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

  const handleClick = () => {
    navigate({
      pathname: `/notes/${id}`,
      search: searchParams.toString(),
    });
  };

  return (
    <div
      className={`${styles.note} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
    >
      <div className={styles.folderIndicatorContainer}>
        <div
          className={styles.folderIndicator}
          style={{ backgroundColor: getCSSVariable(folder?.color || 'grey') }}
        />
      </div>
      <div className={styles.content} ref={contentContainerRef}>
        <div className={styles.title}>{title}</div>
        <TagsList
          tags={tagsList}
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
