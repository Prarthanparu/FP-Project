import { Input, Form } from "antd";

import ModalComponent from "../Modal";

function ExpectationKwargsUpdate({
  isModalVisible,
  setIsModalVisible,
  kwargsArray,
  currentExpectation,
  handleKwargsValue,
}) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    handleKwargsValue(values);
    setIsModalVisible(false);
  };

  return (
    <ModalComponent
      form={form}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      OkText="Apply"
      width="400px"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <a>Define Parameters</a>
        <h4>{currentExpectation}e</h4>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {kwargsArray &&
            kwargsArray.map((item) => (
              <Form.Item key={item} label={item} name={item}>
                <Input
                  id={item}
                  type="text"
                  style={{ width: 250, height: 41 }}
                  placeholder={item}
                />
              </Form.Item>
            ))}
        </Form>
      </div>
    </ModalComponent>
  );
}

export default ExpectationKwargsUpdate;
