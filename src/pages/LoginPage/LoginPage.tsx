import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.ts";
import { Button, Form, Input, Select } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import AppColors from "../../shared/styles/AppColors.ts";
import Stylesheet from "reactjs-stylesheet";
import { LoginModelRequest } from "../../network/models/LoginModelRequest.ts";
import ApiRepository from "../../network/ApiRepository.ts";
import "./LoginPage.css";
import Assets from "../../assets/Assets.ts";
import { AppToastRef } from "../../App.tsx";
import Scaffold, { TypeLoading } from "../../shared/components/Scaffold/Scaffold.tsx";
import usePageState from "../../hooks/usePageState.ts";
import { sleep } from "../../shared/utility/Util.ts";

interface LoginFormValue {
  username: string;
  password: string;
  remember: boolean;
}

interface Company {
  value: string;
  label: string;
}

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const form = Form.useFormInstance<LoginFormValue>();
  const { isLoading, setLoading, repository, showSuccess, showError } = usePageState();

  async function _login(request: LoginModelRequest) {
    try {
      setLoading(true);
      const res = await repository.login(request);
      if (res.data) {
        showSuccess(res.message);
        signIn(res.data);
      } else {
        showError(res.message)
      }
    } finally {
      setLoading(false);
    }
  }

  const onFinish = (values: LoginFormValue) => {
    return _login({
      email: values.username,
      password: values.password,
    });
  };

  return (
    <Scaffold isLoading={isLoading} typeLoading={TypeLoading.OVERLAY}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div className={"pm-card"}>
          {/* <img
            src={Assets.icAccton}
            style={{
              height: 110,
              objectFit: "contain",
            }}
            alt={""}
          /> */}
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <h4>Email</h4>

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <h4>Password</h4>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button style={styles.button} htmlType="submit" className="login-form-button">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Scaffold>
  );
};

const styles = Stylesheet.create({
  button: {
    background: AppColors.colorPrimary,
    width: "100%",
    padding: 10,
    color: AppColors.colorWhite,
    height: "fit-content",
    fontWeight: "500",
    fontSize: 14,
  },
  title1: {
    fontSize: 18,
    fontWeight: 1,
  },
  title2: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default LoginPage;
