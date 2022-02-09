import { Button, Input, Form, Table } from 'antd';

import ModalComponent from '../Modal';

function ExpectationKwargsUpdate({
  isModalVisible,
  setIsModalVisible,
  kwargsArray,
  currentExpectation,
}) {
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handleOk = () => {};
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ModalComponent
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      OkText='Apply'
      width='400px'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <a>Define Parameters</a>
        <h4>{currentExpectation}e</h4>
        <Form onFinish={(values) => handleFormSubmit(values)} layout='vertical'>
          {kwargsArray &&
            kwargsArray.map((item) => (
              <Form.Item key={item} label={item}>
                <Input
                  id={item}
                  type='text'
                  style={{ width: 250, height: 41 }}
                  placeholder={item}
                />
              </Form.Item>
            ))}

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
          <Button key='back' onClick={handleCancel}>
            Cancle
          </Button>
        </Form>
      </div>
    </ModalComponent>
  );
}

export default ExpectationKwargsUpdate;
