import React, { useRef, useState } from 'react';
import styles from './style.module.css';

export function PhotoPanel(props) {
  const { imgFile, cropWindow, imgRef } = props;
  const topRef = useRef(),
    rightRef = useRef(),
    bottomRef = useRef(),
    leftRef = useRef(),
    ltRef = useRef(),
    rtRef = useRef(),
    lbRef = useRef(),
    rbRef = useRef();
  let point = useRef({});
  let controler = useRef({});
  let centerRef = useRef({});

  const [whichControler, setWhichControler] = useState('');
  const [isMove, setIsMove] = useState(false);
  const [isResize, setIsResize] = useState(false);

  const getDimensions = (e) => {
    const dimension = e.target.naturalHeight / e.target.naturalWidth;
    if (dimension > 1) {
      e.target.style.height = '400px';
      e.target.style.width = `${400 / dimension}px`;
    } else {
      e.target.style.width = '600px';
      e.target.style.height = `${600 * dimension}px`;
    }
  };

  const move = (e) => {
    const { width, height } = imgRef.current.getBoundingClientRect();
    const cropWidth = cropWindow.current.offsetWidth;
    const cropHeight = cropWindow.current.offsetHeight;
    let left = e.clientX + point.current.left;
    let top = e.clientY + point.current.top;

    left =
      left > width - cropWidth
        ? width - cropWidth
        : left < 0
        ? 0
        : left;
    top =
      top > height - cropHeight
        ? height - cropHeight
        : top < 0
        ? 0
        : top;

    cropWindow.current.style.left = `${left}px`;
    cropWindow.current.style.top = `${top}px`;

    leftRef.current.style.width = `${left}px`;
    topRef.current.style.height = rightRef.current.style.top = leftRef.current.style.top = `${top}px`;
    rightRef.current.style.width = `${width - cropWidth - left}px`;
    bottomRef.current.style.height = `${height - cropHeight - top}px`;
    if (isMove) {
    }
  };
  const resize = (e) => {
    console.log(
      controler.current.maxWidth,
      controler.current.maxHeight,
    );
    let left = controler.current.left + e.clientX;
    let top = controler.current.top + e.clientY;
    let right = controler.current.right - e.clientX;
    let bottom = controler.current.bottom - e.clientY;

    left =
      left > controler.current.maxWidth - 50
        ? controler.current.maxWidth - 50
        : left < 0
        ? 0
        : left;
    top =
      top > controler.current.maxHeight - 50
        ? controler.current.maxHeight - 50
        : top < 0
        ? 0
        : top;
    right =
      right > controler.current.maxWidth - 50
        ? controler.current.maxWidth - 50
        : right < 0
        ? 0
        : right;
    bottom =
      bottom > controler.current.maxHeight - 50
        ? controler.current.maxHeight - 50
        : bottom < 0
        ? 0
        : bottom;

    if (whichControler === 'lt') {
      cropWindow.current.style.left = `${left}px`;
      cropWindow.current.style.top = `${top}px`;
      cropWindow.current.style.width = `${
        controler.current.maxWidth - left
      }px`;
      cropWindow.current.style.height = `${
        controler.current.maxHeight - top
      }px`;
      leftRef.current.style.width = `${left}px`;
      leftRef.current.style.height = rightRef.current.style.height = `${cropWindow.current.offsetHeight}px`;
      leftRef.current.style.top = rightRef.current.style.top = `${top}px`;
      topRef.current.style.height = `${top}px`;
    }
    if (whichControler === 'rt') {
      cropWindow.current.style.width = `${
        controler.current.maxWidth - right
      }px`;
      cropWindow.current.style.height = `${
        controler.current.maxHeight - top
      }px`;
      cropWindow.current.style.top = `${top}px`;

      rightRef.current.style.width = `${right}px`;
      leftRef.current.style.height = rightRef.current.style.height = `${cropWindow.current.offsetHeight}px`;
      topRef.current.style.height = `${top}px`;
      rightRef.current.style.top = leftRef.current.style.top = `${top}px`;
    }
    if (whichControler === 'lb') {
      cropWindow.current.style.width = `${
        controler.current.maxWidth - left
      }px`;
      cropWindow.current.style.height = `${
        controler.current.maxHeight - bottom
      }px`;

      leftRef.current.style.width = `${left}px`;
      rightRef.current.style.height = leftRef.current.style.height = `${cropWindow.current.offsetHeight}px`;
      bottomRef.current.style.height = `${bottom}px`;
      cropWindow.current.style.left = `${left}px`;
    }
    if (whichControler === 'rb') {
      cropWindow.current.style.width = `${
        controler.current.maxWidth - right
      }px`;
      cropWindow.current.style.height = `${
        controler.current.maxHeight - bottom
      }px`;

      rightRef.current.style.width = `${right}px`;
      rightRef.current.style.height = leftRef.current.style.height = `${cropWindow.current.offsetHeight}px`;
      bottomRef.current.style.height = `${bottom}px`;
    }
  };

  const onMove = (e) => {
    if (isMove) {
      move(e);
    }
    if (isResize) {
      resize(e);
    }
  };
  const startDrag = (e) => {
    if (e.target === cropWindow.current) {
      setIsMove(true);
      point.current.left = cropWindow.current.offsetLeft - e.clientX;
      point.current.top = cropWindow.current.offsetTop - e.clientY;
    }
    if (Array.from(e.target.classList).includes(styles.resize)) {
      const {
        width,
        height,
      } = imgRef.current.getBoundingClientRect();
      controler.current.x = e.clientX;
      controler.current.y = e.clientY;
      controler.current.width = cropWindow.current.offsetWidth;
      controler.current.height = cropWindow.current.offsetHeight;
      controler.current.parentWidth = width;
      controler.current.parentHeight = height;
      controler.current.left =
        cropWindow.current.offsetLeft - e.clientX;
      controler.current.top =
        cropWindow.current.offsetTop - e.clientY;
      controler.current.right =
        width -
        cropWindow.current.offsetWidth -
        cropWindow.current.offsetLeft +
        e.clientX;
      controler.current.bottom =
        height -
        cropWindow.current.offsetHeight -
        cropWindow.current.offsetTop +
        e.clientY;

      setIsResize(true);
      if (Array.from(e.target.classList).includes(styles.lt)) {
        controler.current.maxWidth =
          cropWindow.current.offsetWidth +
          cropWindow.current.offsetLeft;
        controler.current.maxHeight =
          cropWindow.current.offsetHeight +
          cropWindow.current.offsetTop;
        setWhichControler('lt');
      }
      if (Array.from(e.target.classList).includes(styles.rt)) {
        controler.current.maxWidth =
          width - cropWindow.current.offsetLeft;
        controler.current.maxHeight =
          cropWindow.current.offsetHeight +
          cropWindow.current.offsetTop;
        setWhichControler('rt');
      }
      if (Array.from(e.target.classList).includes(styles.lb)) {
        controler.current.maxWidth =
          cropWindow.current.offsetWidth +
          cropWindow.current.offsetLeft;
        controler.current.maxHeight =
          height - cropWindow.current.offsetTop;
        setWhichControler('lb');
      }
      if (Array.from(e.target.classList).includes(styles.rb)) {
        controler.current.maxWidth =
          width - cropWindow.current.offsetLeft;
        controler.current.maxHeight =
          height - cropWindow.current.offsetTop;
        setWhichControler('rb');
      }
    }
  };
  const endDrag = (e) => {
    setIsMove(false);
    setIsResize(false);
  };

  const touchStart = (e) => {
    if (e.targetTouches.length === 1) {
      startDrag(e.targetTouches[0]);
    }
    if (e.targetTouches.length === 2) {
      if (e.target === cropWindow.current) {
        setIsMove(true);
        centerRef.current.minX = Math.min(
          e.targetTouches[0].clientX,
          e.targetTouches[1].clientX,
        );
        centerRef.current.minY = Math.min(
          e.targetTouches[0].clientY,
          e.targetTouches[1].clientY,
        );
        centerRef.current.maxX = Math.max(
          e.targetTouches[0].clientX,
          e.targetTouches[1].clientX,
        );
        centerRef.current.maxY = Math.max(
          e.targetTouches[0].clientY,
          e.targetTouches[1].clientY,
        );
        centerRef.current.width =
          cropWindow.current.offsetWidth -
          Math.abs(
            e.targetTouches[0].clientX - e.targetTouches[1].clientX,
          );
        centerRef.current.height =
          cropWindow.current.offsetHeight -
          Math.abs(
            e.targetTouches[0].clientY - e.targetTouches[1].clientY,
          );
        centerRef.current.left = cropWindow.current.offsetLeft;
        centerRef.current.top = cropWindow.current.offsetTop;
        centerRef.current.right =
          imgRef.current.offsetWidth -
          cropWindow.current.offsetWidth -
          cropWindow.current.offsetLeft;
        centerRef.current.bottom =
          imgRef.current.offsetHeight -
          cropWindow.current.offsetHeight -
          cropWindow.current.offsetTop;
      }
    }
  };

  const touchMove = (e) => {
    if (e.targetTouches.length === 1) {
      onMove(e.targetTouches[0]);
    }
    if (e.targetTouches.length === 2) {
      let left =
        Math.min(
          e.targetTouches[0].clientX,
          e.targetTouches[1].clientX,
        ) -
        centerRef.current.minX +
        centerRef.current.left;
      left = left < 0 ? 0 : left;
      let top =
        Math.min(
          e.targetTouches[0].clientY,
          e.targetTouches[1].clientY,
        ) -
        centerRef.current.minY +
        centerRef.current.top;
      top = top < 0 ? 0 : top;
      let width =
        Math.abs(
          e.targetTouches[0].clientX - e.targetTouches[1].clientX,
        ) + centerRef.current.width;
      width =
        width > imgRef.current.offsetWidth - left
          ? imgRef.current.offsetWidth - left
          : width;
      let height =
        Math.abs(
          e.targetTouches[0].clientY - e.targetTouches[1].clientY,
        ) + centerRef.current.height;
      height =
        height > imgRef.current.offsetHeight - top
          ? imgRef.current.offsetHeight - top
          : height;

      cropWindow.current.style.width = `${width}px`;
      cropWindow.current.style.height = `${height}px`;
      cropWindow.current.style.left = `${left}px`;
      cropWindow.current.style.top = `${top}px`;

      topRef.current.style.height = `${top}px`;
      leftRef.current.style.width = `${left}px`;
      leftRef.current.style.height = rightRef.current.style.height = `${height}px`;
      rightRef.current.style.width = `${
        imgRef.current.offsetWidth - width - left
      }px`;
      bottomRef.current.style.height = `${
        imgRef.current.offsetHeight - height - top
      }px`;
      leftRef.current.style.top = rightRef.current.style.top = `${top}px`;
    }
  };

  const touchEnd = (e) => {
    endDrag();
  };
  return (
    <div
      className={styles.photoPanel}
      onMouseDown={startDrag}
      onMouseMove={onMove}
      onMouseUp={endDrag}
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
    >
      <div className={styles.previewArea}>
        <img
          ref={imgRef}
          src={imgFile}
          alt="file"
          onLoad={getDimensions}
        />

        <div
          className={styles.window}
          ref={cropWindow}
          style={{
            top: 'calc((100% - 150px) / 2)',
            left: 'calc((100% - 150px) / 2)',
          }}
        >
          <div
            ref={ltRef}
            className={[styles.resize, styles.lt].join(' ')}
          ></div>
          <div
            ref={rtRef}
            className={[styles.resize, styles.rt].join(' ')}
          ></div>
          <div
            ref={lbRef}
            className={[styles.resize, styles.lb].join(' ')}
          ></div>
          <div
            ref={rbRef}
            className={[styles.resize, styles.rb].join(' ')}
          ></div>
        </div>
        <div
          ref={topRef}
          className={[styles.cover, styles.top].join(' ')}
        ></div>
        <div
          ref={leftRef}
          className={[styles.cover, styles.left].join(' ')}
        ></div>
        <div
          ref={rightRef}
          className={[styles.cover, styles.right].join(' ')}
        ></div>
        <div
          ref={bottomRef}
          className={[styles.cover, styles.bottom].join(' ')}
        ></div>
      </div>
    </div>
  );
}
