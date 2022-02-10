import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import SelectedTableCard from '../SelectedTableCard';
import {
  Button,
  Input,
  DatePicker,
  Checkbox,
  Table,
  message,
  Spin,
  Form,
  notification,
} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Steps, Popover } from 'antd';
import ModalComponent from '../../Components/Modal';
import Axios from 'axios';
import { static_column_expectations } from './ColumnExpectations';
import { useDispatch, useSelector } from 'react-redux';
import { addColumnExpectation } from '../../redux/slices/dataSourceSlice';

function ColumnExpectation() {
  const { state } = useLocation();
  const [columnData, setColumnData] = useState([]);
  const navigate = useNavigate();

  const { Step } = Steps;
  const [tableExpectaions, setTableExpectations] = useState([]);
  const [currentTableExpectation, setCurrentTableExpectation] = useState(
    state.expectationsData[0]
  );
  const [currentTableIndex, setCurrentTableIndex] = useState(0);

  // user selected table expections
  const [selectedColumnExpectations, setSelectedColumnExpectations] = useState(
    []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [payload, setPayload] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState();
  const dispatch = useDispatch();

  const datasource = useSelector((state) => state.datasource);

  const proxy = process.env.REACT_APP_PROXY;
  const expectationsuiteUrl = proxy + '/api/expectationsuite';

  const [screenLoading, setScreenLoading] = useState(false);

  //  Initialize the state with the data from the state
  useEffect(() => {
    setPayload(state.payload);
  }, []);

  useEffect(() => {
    const filterItems = (arr, query) => {
      return arr.filter(function (el) {
        return (
          el.expectation_type.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
    };
    if (
      currentTableIndex >= 0 &&
      currentTableIndex < state.expectationsData.length
    ) {
      setTableExpectations(state.expectationsData);
      setCurrentTableExpectation(state.expectationsData[currentTableIndex]);
      const filteredExpectations = filterItems(
        state && state.expectationsData[currentTableIndex].expectations,
        'expect_column'
      );
      setSelectedColumnExpectations(filteredExpectations);
      let uniqueColumns = [];
      filteredExpectations.forEach((element) => {
        if (
          uniqueColumns.find((x) => x.columnName === element.kwargs.column) ===
          undefined
        ) {
          uniqueColumns.push({
            columnName: element.kwargs.column,
            columnExpectations: [element.expectation_type],
            selectedExpectations: [],
          });
        } else {
          uniqueColumns
            .find((x) => x.columnName === element.kwargs.column)
            .selectedExpectations.push(element.expectation_type);
        }
      });
      setColumnData(uniqueColumns);
    }
  }, [state, currentTableIndex, tableExpectaions]);

  useEffect(() => {
    let exp_arr = columnData
      .map((item) => {
        return item.expectation_type;
      })
      .join(',');

    const newObj = {};
    newObj['expectation_type'] = exp_arr;
  }, [columnData]);

  const columns = [
    {
      title: 'Column Name',
      width: 50,
      dataIndex: 'columnName',
      key: 'columnName',
      fixed: 'center',
    },
    {
      title: 'Expectations',
      width: 60,
      dataIndex: 'selectedExpectations',
      key: 'selectedExpectations',
      render: (items) => {
        return items.map((item) => (
          <div key={item}>
            {item},{' '}
            <span className='close_btn' onClick={() => removeExpectation(item)}>
              Remove
            </span>
          </div>
        ));
      },
      // render: (items) =>},
      fixed: 'center',
    },
    {
      title: 'Add Expectations',
      dataIndex: 'columnName',
      key: 'columnName',
      width: 20,
      render: (columnName) => (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
          <Button
            type='secondary'
            id={columnName}
            onClick={(e) => {
              setSelectedColumn(e.target.parentNode.id);
              let columnExpectaionsFromStore = columnData.find(
                (col) => col.columnName === e.target.parentNode.id
              ).columnExpectations;
              setModalData(
                static_column_expectations
                  .filter(function (el) {
                    return (
                      columnExpectaionsFromStore.find((x) => x === el.title) ===
                      undefined
                    );
                  })
                  .map((item) => {
                    return {
                      key: item.title,
                      name: item.title,
                    };
                  })
              );
              setIsModalVisible(true);
            }}>
            Select
          </Button>
        </div>
      ),
    },
  ];

  const removeExpectation = (value) => {
    for (let i = 0; i < columnData.length; i++) {
      const { selectedExpectations } = columnData[i];
      const getIndex = selectedExpectations.indexOf(value);
      if (getIndex > -1) {
        selectedExpectations.splice(getIndex, 1);
        break;
      }
    }

    console.log('colui = ', columnData);
  };

  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }>
      {dot}
    </Popover>
  );

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 20,
        color: '#ef7434',
      }}
    />
  );

  const suffix1 = (
    <FilterOutlined
      style={{
        fontSize: 20,
        color: '#ef7434',
      }}
    />
  );

  const handleNext = () => {
    if (currentTableIndex < tableExpectaions.length - 1) {
      let colPayload = [];
      columnData.forEach((element) => {
        let colExpectations = [];
        element.selectedExpectations.forEach((item) => {
          colExpectations.push({
            expectation_type: item,
            kwargs: {
              column: element.columnName,
            },
          });
        });
        colPayload = [...colPayload, ...colExpectations];
      });

      let payloadColumnExpectations = [
        { [currentTableExpectation?.expectation_suite_name]: colPayload },
      ];

      dispatch(addColumnExpectation(payloadColumnExpectations));
      setCurrentTableExpectation(tableExpectaions[currentTableIndex + 1]);
      setCurrentTableIndex(currentTableIndex + 1);
    } else {
      setScreenLoading(true);
      const { column_expectations, table_expectations } = datasource;
      const params = {
        dataset_ids: state.dataset_ids,
        report_mart_id: state.reportmart_id,
        datasource_id: state.data_source_id,
        payload: {
          column_expectations,
          table_expectations,
        },
      };

      Axios.post(expectationsuiteUrl, params, {
        headers: { type: 'reportmart' },
      })
        .then((res) => {
          setScreenLoading(false);
          // TODO fix this hard code res.data.result[response.data.datasets_response_id[0]]
          navigate(
            '/configuration/datasource/martdetails/columnchecks/datadocs',
            {
              state: {
                ...state,
                payload: {
                  column_expectations,
                  table_expectations,
                },
              },
            }
          );
          message.success('Profiling Done Successfully!');
        })
        .catch((err) => {
          setScreenLoading(false);
          notification.error({
            message:
              err.message === 'Request failed with status code 500'
                ? '500'
                : 'Error',
            description:
              err.message === 'Request failed with status code 500'
                ? 'Internal Server Error'
                : err.message,
          });
        });
    }
  };

  function onSelectChange(selectedRowKeys) {
    setSelectedRowKeys(selectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleOk = () => {
    let data = selectedRowKeys.map((key) => {
      return {
        expectation_type: key,
        kwargs: {},
        meta: {},
      };
    });

    let newSelectedExpectations = [
      ...columnData.find((col) => col.columnName === selectedColumn)
        .selectedExpectations,
    ];
    selectedRowKeys.forEach((element) => {
      if (newSelectedExpectations.find((x) => x === element) === undefined) {
        newSelectedExpectations.push(element);
      }
    });
    let newColumnData = [...columnData];
    newColumnData.find(
      (col) => col.columnName === selectedColumn
    ).selectedExpectations = newSelectedExpectations;
    setColumnData(newColumnData);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Tableview>
      <CardComponent>
        <SelectedTableCard
          tableName={currentTableExpectation?.expectation_suite_name}
        />
      </CardComponent>
      <TableContent>
        <Header>
          <h1>Select Column Expecations</h1>
          <Steps progressDot={customDot} current={currentTableIndex}>
            {tableExpectaions.map((columnExpectaion, index) => (
              <Step
                key={index}
                title={columnExpectaion?.expectation_suite_name}
              />
            ))}
          </Steps>
        </Header>

        {/* <Components>
          <Input
            placeholder="Search Your Source"
            style={{ width: 283, height: 41 }}
            suffix={suffix}
          />
          <Input
            placeholder="Search Your Source"
            style={{ width: 147, height: 41 }}
            suffix={suffix1}
          />

          <DatePicker size={"large"} />
          <CheckboxSelect>
            <Checkbox onChange={onChange}>Select All</Checkbox>
          </CheckboxSelect>
        </Components> */}
        <Spin
          className='spin'
          tip='Profiling in Progress...'
          spinning={screenLoading}>
          <ExpectationsList>
            <Table
              columns={columns}
              dataSource={columnData}
              pagination={false}
              scroll={{ x: 800, y: 400 }}
              style={{ width: '100%' }}
            />
          </ExpectationsList>
        </Spin>
        <ButtonContent>
          <Button onClick={handleNext}>Next</Button>
        </ButtonContent>
      </TableContent>
      {isModalVisible && (
        <ModalComponent
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          OkText='Apply'
          width='850px'>
          <Table
            columns={[
              {
                title: 'Select All',
                dataIndex: 'key',
                key: 'key',
                fixed: 'center',
              },
            ]}
            rowSelection={rowSelection}
            dataSource={modalData}
            pagination={false}
            scroll={{ x: 700, y: 400 }}
            style={{ width: '100%' }}
          />
        </ModalComponent>
      )}
    </Tableview>
  );
}

export default ColumnExpectation;

const Tableview = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const CardComponent = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h4 {
    margin-top: 20px;
    font-weight: bold;
  }
`;

const TableContent = styled.div`
  display: flex;
  flex: 8;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  > h1 {
    font-weight: bold;
    font-size: 30px;
    letter-spacing: 0.05em;
    color: #ef7434;
  }
`;

const Components = styled.div`
  display: flex;
  width: 80%;
  margin-top: 30px;
  justify-content: flex-start;
  gap: 20px;
`;

const ExpectationsList = styled.div`
  height: 500px;
  width: 80%;
  justify-content: center;
  overflow: auto;
  margin-top: 20px;
`;
const ButtonContent = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;
