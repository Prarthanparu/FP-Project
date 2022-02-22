import React from "react";
import { Modal, Button } from "antd";

const ModalComponent = (props) => {
  return (
    <Modal
      title={props.title}
      visible={props.isModalVisible}
      onOk={props.handleOk}
      centered
      onCancel={props.handleCancel}
      closable={false}
      width={props.width}
      footer={[
        <Button key="back" onClick={props.handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.loading}
          onClick={props.handleOk}
        >
          {props.OkText}
        </Button>,
      ]}
    >
      {props.children}
    </Modal>
  );
};

export default ModalComponent;
