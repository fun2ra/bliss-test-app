import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined spin />;

const LoadingScreen = ({ text }: { text: string }) => {
  return (
    <div className="loading-spin">
      <div>{text}</div>
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};

export default LoadingScreen;
