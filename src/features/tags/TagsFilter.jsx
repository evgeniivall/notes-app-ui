import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Tag from './Tag';
import Button from '../../ui/Button';
import styles from './TagsFilter.module.css';

function TagsFilter() {
  const tags = useSelector((state) => state.tags.tags);
  const [selectedTagIndices, setSelectedTagIndices] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedTagIndices.length > 0) {
      const selectedTagIds = selectedTagIndices.map((index) => tags[index].id);
      params.set('tags', selectedTagIds.join(','));
    } else {
      params.delete('tags');
    }
    setSearchParams(params);
  }, [searchParams, setSearchParams, tags, selectedTagIndices]);

  const handleTagClick = useCallback(
    (index) => {
      const newSelectedTagIndices = selectedTagIndices.includes(index)
        ? selectedTagIndices.filter((i) => i !== index)
        : [...selectedTagIndices, index];
      setSelectedTagIndices(newSelectedTagIndices);
    },
    [selectedTagIndices],
  );

  const handleReset = () => {
    setSelectedTagIndices([]);
  };

  return (
    <div className={styles.tagsFilter}>
      <header className={styles.header}>
        <span className={styles.title}>Tags</span>
        {selectedTagIndices.length > 0 && (
          <Button type="tertiary" label="Reset" onClick={handleReset} />
        )}
      </header>
      <div className={styles.tagsList}>
        {tags.map((tag, index) => (
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            isSelected={selectedTagIndices.includes(index)}
            onClick={() => handleTagClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default TagsFilter;
