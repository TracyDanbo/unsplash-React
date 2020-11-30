import React, { useRef, useState, useEffect } from 'react';
import {
  ContainedButton,
  TextButton,
} from '../../components/materialButton';
import LoadingDot from '../../components/loadingDot';
import { PhotoPanel } from './photoPanel';
import { ReactComponent as BackIcon } from '../../assets/images/arrow_back-black-18dp.svg';
import styles from './style.module.css';

function Upload(props) {
  const { setIsOpen, uploadImage, deletehash, cleanImgur } = props;
  const inputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imgFile, setImgFile] = useState('');
  const [isSelected, setIselected] = useState(false);
  const cropWindow = useRef();
  const imgRef = useRef();
  const chooseFile = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (deletehash) {
      setIsUploaded(true);
    }
  }, [deletehash]);
  const getfile = () => {
    const file = inputRef.current.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgFile(e.target.result);
    };
    reader.readAsDataURL(file);
    setIselected(true);
  };
  const UploadFile = () => {
    if (!imgFile) {
      return;
    }
    const scale =
      imgRef.current.offsetHeight / imgRef.current.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = cropWindow.current.offsetWidth / scale;
    canvas.height = cropWindow.current.offsetHeight / scale;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      imgRef.current,
      cropWindow.current.offsetLeft / scale,
      cropWindow.current.offsetTop / scale,
      cropWindow.current.offsetWidth / scale,
      cropWindow.current.offsetHeight / scale,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    let dataUrl = canvas.toDataURL();
    dataUrl = dataUrl.replace('data:image/png;base64,', '');
    uploadImage(dataUrl);
    setIsUploading(true);
  };
  const cancel = () => {
    setIsOpen(false);
    cleanImgur();
  };

  const reSelect = () => {
    setImgFile('');
    setIselected(false);
    setIsUploading(false);
  };

  return (
    <div className={styles.uploadPanel}>
      <h1>
        {isSelected ? <BackIcon onClick={reSelect} /> : null}
        <span>Choose your profile photo</span>
      </h1>
      <div className={styles.previewBox}>
        {!isSelected ? (
          <div className={styles.upload}>
            <ContainedButton color="blue" onClick={chooseFile}>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                className={styles.input}
                onChange={getfile}
              />
              Choose Photo
            </ContainedButton>
          </div>
        ) : imgFile && !isUploading ? (
          <PhotoPanel
            imgFile={imgFile}
            cropWindow={cropWindow}
            imgRef={imgRef}
          />
        ) : isUploading && !isUploaded ? (
          <LoadingDot size={32} />
        ) : (
          <div className={styles.uploaded}>
            <p>Profile Updated</p>
            <ContainedButton
              text="Confirm"
              color="blue"
              onClick={cancel}
              ripple={false}
            ></ContainedButton>
          </div>
        )}
      </div>

      <div className={styles.actionbox}>
        {!isUploading ? (
          <>
            <TextButton
              text="Upload Photo"
              color="blue"
              onClick={UploadFile}
              ripple={false}
            />
            <TextButton
              text="Cancel"
              color="gray"
              onClick={cancel}
              ripple={false}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
export default Upload;
