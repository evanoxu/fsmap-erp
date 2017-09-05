import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Config } from '../../utils';
import { Button, Row, Form, Input } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

const Login = ({
  login,
  dispatch,
  form: {
      getFieldDecorator,
      validateFieldsAndScroll,
  },
}) => {
  const { loginLoading } = login;

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return ;
      }
      dispatch({ type: 'login/login', payload: values });
    });
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={Config.logo} />
        <span>{Config.name}</span>
      </div>
      <form>
        <FormItem>
          {getFieldDecorator('account', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="账号" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
            登录
          </Button>
        </Row>

      </form>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(({ login }) => ({ login }))(Form.create()(Login));
