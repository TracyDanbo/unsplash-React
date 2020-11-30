import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './style.module.css';
import { ReactComponent as SearchIcon } from '../../assets/images/search-white-18dp.svg';

function Search(props) {
  const { className } = props;
  const [query, setQuery] = useState('');
  const history = useHistory();
  const onChangeHandle = (event) => {
    setQuery(event.target.value);
  };
  const onSubmitHandle = (event) => {
    event.preventDefault();
    history.push(`/search/photos/${query}`);
  };
  return (
    <form
      onSubmit={onSubmitHandle}
      className={[styles.container, className].join(' ')}
    >
      <SearchIcon className={styles.icon} />
      <label className={styles.field}>
        <input
          type="text"
          value={query}
          onChange={onChangeHandle}
          placeholder="Search..."
        />
      </label>
    </form>
  );
}

export default Search;
