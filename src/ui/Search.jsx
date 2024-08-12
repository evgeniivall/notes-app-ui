import { useSearchParams } from 'react-router-dom';
import { CloseIcon, SearchIcon } from '../icons/icons';
import { useEffect, useState } from 'react';
import styles from './Search.module.css';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(searchQuery);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      searchParams.set('search', value);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.search}>
      <SearchIcon className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search for your notes"
        value={searchValue}
        onChange={handleInputChange}
      />
      {searchValue && (
        <CloseIcon onClick={handleClearSearch} className={styles.clearBtn} />
      )}
    </div>
  );
}

export default Search;
