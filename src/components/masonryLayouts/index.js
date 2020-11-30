import React, { useRef, useEffect } from 'react';
import { useObserver, useColumn } from '../../Hook';
import PropTypes from 'prop-types';
import { witSpinner } from '../../HOC';
import styles from './style.module.css';

function MasonryLayouts(props) {
  const {
    keyExtractor,
    renderItem,
    data,
    onEndReached,
    threshold,
    className,
  } = props;
  let timer = useRef();
  const callback = (entry, observer) => {
    if (entry.isIntersecting && entry.intersectionRect.height > 0) {
      if (timer.current) {
        clearTimeout(timer);
        timer.current = setTimeout(() => {
          onEndReached && onEndReached();
        }, 200);
      } else {
        timer.current = setTimeout(() => {
          onEndReached && onEndReached();
        }, 200);
      }
    }
  };
  const columns = useColumn();
  let dataArray = [];
  for (let i = 0; i < columns; i++) {
    dataArray[i] = [];
  }
  data.forEach((item, index) => {
    dataArray[index % columns].push(item);
  });
  dataArray = dataArray.filter((item) => item.length > 0);

  const targets = useRef([]);
  const observer = useObserver(callback, { threshold });

  useEffect(() => {
    targets.current.forEach((item) => {
      observer.observe(item);
    });
    targets.current = [];
    return () => {
      observer.disconnect();
    };
  });

  return (
    <div className={[styles.container, className].join(' ')}>
      {dataArray.map((dataList, index) => {
        return (
          <ul key={index} className={styles.column}>
            {dataList.map((item, index) => {
              if (index === dataList.length - 1) {
                return (
                  <li
                    className={styles.item}
                    key={keyExtractor(item)}
                    ref={(li) => {
                      if (li) {
                        targets.current.push(li);
                      }
                    }}
                  >
                    {renderItem(item)}
                  </li>
                );
              }
              return (
                <li key={keyExtractor(item)}>
                  {renderItem(item, columns)}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

MasonryLayouts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func,
  onEndReached: PropTypes.func,
  threshold: PropTypes.number,
  className: PropTypes.string,
  hasMore: PropTypes.bool,
};

export default witSpinner(MasonryLayouts);
