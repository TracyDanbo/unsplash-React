import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Route, NavLink, useRouteMatch } from 'react-router-dom';
import * as actions from '../../actions';
import Photos from './photos';
import Collections from './collections';
import Users from './users';
import { useSticky } from '../../Hook';
import { StandardSelect } from '../../components/materialTextField';
import styles from './style.module.css';
import { ReactComponent as PhotoIcon } from '../../assets/images/insert_photo-white-18dp.svg';
import { ReactComponent as CollectionIcon } from '../../assets/images/layers-white-18dp.svg';
import { ReactComponent as UsersIcon } from '../../assets/images/group-black-18dp.svg';
function Search(props) {
  const { t } = useTranslation('search');
  const tapBar = useRef();
  const {
    params: { query },
  } = useRouteMatch();
  const dispatch = useDispatch();
  const formatCount = (count) => {
    let result = count;
    count = Number.parseInt(count);
    if (count > 1000) {
      count = (count / 1000).toFixed(1);
      result = `${count}k`;
    }
    return result;
  };
  const total = useSelector((state) => ({
    photos: formatCount(state.unsplash.search_photos_total),
    collections: formatCount(state.unsplash.search_collections_total),
    users: formatCount(state.unsplash.search_users_total),
  }));
  const orientation = ['landscape', 'portrait', 'squarish'];
  const color = [
    'black_and_white',
    'black',
    'white',
    'yellow',
    'orange',
    'red',
    'purple',
    'magenta',
    'green',
    'teal',
    'blue',
  ];
  const [filter, setFilter] = useState({});
  const updateFilter = (ob) => {
    setFilter((state) => ({
      ...state,
      ...ob,
    }));
  };
  const onScrollDown = (event) => {
    tapBar.current.classList.add(styles.sticky);
  };
  const onScrollUp = (event) => {
    tapBar.current.classList.remove(styles.sticky);
  };

  useSticky(onScrollDown, onScrollUp);
  useEffect(() => {
    dispatch(actions.clearSearch());
    dispatch(actions.searchPhotos(query, 1, 15));
    dispatch(actions.searchCollections(query, 1, 15));
    dispatch(actions.searchUsers(query, 1, 15));
  }, [dispatch, query]);

  useEffect(() => {
    if (!Object.keys(filter).length) return;
    dispatch(actions.clearSearchPhotos());
    dispatch(actions.searchPhotos(query, 1, 15, filter));
  }, [dispatch, filter, query]);

  return (
    <>
      <div className={styles.tabBar} ref={tapBar}>
        <div className={styles.navlinks}>
          <NavLink
            to={`/search/photos/${query}`}
            activeClassName={styles.active}
          >
            <PhotoIcon />
            <span>{total.photos}</span>
          </NavLink>
          <NavLink
            to={`/search/collections/${query}`}
            activeClassName={styles.active}
          >
            <CollectionIcon />
            <span>{total.collections}</span>
          </NavLink>
          <NavLink
            to={`/search/users/${query}`}
            activeClassName={styles.active}
          >
            <UsersIcon />
            <span>{total.users}</span>
          </NavLink>
        </div>
        <Route path="/search/photos/:query">
          <div className={styles.filter}>
            <StandardSelect
              options={orientation.map((item) => t(item))}
              optionValues={orientation}
              label={t('orientation')}
              labelText={'orientation'}
              color="orange"
              value={filter.orientation ? t(filter.orientation) : ''}
              onChange={updateFilter}
            />
            <StandardSelect
              options={color.map((item) => t(item))}
              label={t('color')}
              labelText={'color'}
              color="orange"
              value={filter.color ? t(filter.color) : ''}
              optionValues={color}
              onChange={updateFilter}
            />
          </div>
        </Route>
      </div>
      <Route path="/search/photos/:query">
        <Photos className={styles.photosSection} filter={filter} />
      </Route>
      <Route path="/search/collections/:query">
        <Collections className={styles.collectionsSection} />
      </Route>
      <Route path="/search/users/:query">
        <Users className={styles.usersSection} />
      </Route>
    </>
  );
}

export default Search;
