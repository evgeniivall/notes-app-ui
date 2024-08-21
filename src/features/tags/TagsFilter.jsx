import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectTags } from './tagsSlice';
import Tag from './Tag';
import Button from '../../ui/Button';
import styles from './TagsFilter.module.css';

const mapNamesToIndices = (tagNames, allTags) => {
  const indices = tagNames
    .map((name) => allTags.findIndex((tag) => tag.name === name))
    .filter((index) => index !== -1);

  return indices;
};

function TagsFilter() {
  const tags = useSelector(selectTags);
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedTagIndicesFromLocation = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const selectedTags = params.get('tags');
    return selectedTags ? mapNamesToIndices(selectedTags.split(','), tags) : [];
  }, [location.search, tags]);

  const selectedTagIndices = getSelectedTagIndicesFromLocation();

  const updateTagsURLParams = useCallback(
    (newSelectedTagIndices) => {
      const params = new URLSearchParams(location.search);
      if (newSelectedTagIndices.length > 0) {
        const selectedTags = newSelectedTagIndices.map(
          (index) => tags[index].name,
        );
        params.set('tags', selectedTags.join(','));
      } else {
        params.delete('tags');
      }
      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true },
      );
    },
    [location.pathname, location.search, navigate, tags],
  );

  const handleTagClick = useCallback(
    (index) => {
      const newSelectedTagIndices = selectedTagIndices.includes(index)
        ? selectedTagIndices.filter((i) => i !== index)
        : [...selectedTagIndices, index];
      updateTagsURLParams(newSelectedTagIndices);
    },
    [selectedTagIndices, updateTagsURLParams],
  );

  const handleReset = () => {
    updateTagsURLParams([]);
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
            key={tag.name}
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
