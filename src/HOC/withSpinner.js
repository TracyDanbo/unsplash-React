import React from 'react';
import MaterialSpinner from '../components/materialSpinner';
export function witSpinner(Component) {
  return function Wrapper(props) {
    const style = {
      width:
        window.innerWidth * 0.1 > 80 ? 80 : window.innerWidth * 0.1,
      // height:
      //   window.innerWidth * 0.1 > 80 ? 80 : window.innerWidth * 0.1,
      padding: '2rem 0',
      position: 'relative',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    };
    return (
      <>
        <Component {...props} />
        {props.hasMore ? (
          <MaterialSpinner color="orange" style={style} />
        ) : null}
      </>
    );
  };
}
