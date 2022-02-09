import { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';

export default function BasicModal() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values) => {
    console.log('Form submited! = ', values);

    setIsModalVisible(false);
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Show Modal
      </Button>

      <Modal
        title='Basic Modal'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={handleOk}>
            Submit
          </Button>,
        ]}>
        <Form
          labelCol={{ xs: { span: 6 } }}
          wrapperCol={{ xs: { span: 12 } }}
          form={form}
          onFinish={(values) => onFinish(values)}
          scrollToFirstError>
          <Form.Item
            name='input1'
            label='Input 1'
            rules={[{ required: true, message: 'This field is required.' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name='input2'
            label='Input 2'
            rules={[{ required: true, message: 'This field is required.' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
