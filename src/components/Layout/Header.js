import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import styles from './Header.less';

const SubMenu = Menu.SubMenu;

const Header = ({ user, logout, menu }) => {
  let handleClickMenu = e => e.key === 'logout' && logout();
  return (
    <div className={styles.header}>
      <div className={styles.button}></div>
      <div className={styles.rightWarpper}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              {user.info.name}
            </span>}
          >
            <Menu.Item key="logout">
              退出登录
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
}

export default Header
