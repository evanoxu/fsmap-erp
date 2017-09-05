import React from 'react';
import PropTypes from 'prop-types';
import { Config } from '../../utils';
import styles from './Layout.less';
import Menus from './Menu';

const Sider = ({ menu, changeOpenKeys, navOpenKeys }) => {
  const menusProps = {
    menu,
    changeOpenKeys,
    navOpenKeys,
  };
  return (
    <div>
      <div className={styles.logo}>
        <img alt={'logo'} src={Config.logo} />
        <span>{Config.name}</span>
      </div>
      <Menus {...menusProps} />
    </div>
  );
};

Sider.propTypes = {
  menu: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  navOpenKeys: PropTypes.array,
};

export default Sider;
