import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as MakeIcon } from '../../assets/images/camera_alt-white-18dp.svg';
import { ReactComponent as ModeIcon } from '../../assets/images/camera_roll-white-18dp.svg';
import { ReactComponent as ApertureIcon } from '../../assets/images/camera-white-18dp.svg';
import { ReactComponent as TimelapseIcon } from '../../assets/images/timelapse-white-18dp.svg';
import { ReactComponent as LensIcon } from '../../assets/images/lens-white-18dp.svg';
import { ReactComponent as IsoIcon } from '../../assets/images/iso-white-18dp.svg';
import { ReactComponent as ColorIcon } from '../../assets/images/colorize-white-18dp.svg';
import { ReactComponent as SizeIcon } from '../../assets/images/architecture-white-18dp.svg';
import styles from './style.module.css';

function Info(props) {
  const { info } = props;
  return (
    <ul className={styles.infoList}>
      <li>
        <MakeIcon />
        <div>
          <span>Camera make</span>
          <span>{info.make ? info.make : 'UNKNOW'}</span>
        </div>
      </li>
      <li>
        <ModeIcon />
        <div>
          <span>Camera mode</span>
          <span>{info.model ? info.model : 'UNKNOW'}</span>
        </div>
      </li>
      <li>
        <SizeIcon />
        <div>
          <span>Size</span>
          <span>
            {info.width} &times; {info.height}
          </span>
        </div>
      </li>
      <li>
        <LensIcon />
        <div>
          <span>Focal length</span>
          <span>
            {info.focal_length ? info.focal_length : 'UNKNOW'}
          </span>
        </div>
      </li>
      <li>
        <ApertureIcon />
        <div>
          <span>Aperture</span>
          <span>{info.aperture ? info.aperture : 'UNKNOW'}</span>
        </div>
      </li>
      <li>
        <TimelapseIcon />
        <div>
          <span>Exppsure time</span>
          <span>
            {info.exposure_time ? info.exposure_time : 'UNKNOW'}
          </span>
        </div>
      </li>
      <li>
        <IsoIcon />
        <div>
          <span>Iso</span>
          <span>{info.iso ? info.iso : 'UNKNOW'}</span>
        </div>
      </li>
      <li>
        <ColorIcon />
        <div>
          <span>Color</span>
          <p>
            <span
              className={styles.colorBlock}
              style={{ background: info.color }}
            ></span>
            <span>{info.color ? info.color : 'UNKNOW'}</span>
          </p>
        </div>
      </li>
    </ul>
  );
}

Info.propTypes = {
  info: PropTypes.object.isRequired,
};

export default Info;
