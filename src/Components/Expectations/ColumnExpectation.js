import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import {
  Button,
  Table,
  Spin,
  Steps,
  Popover,
  message,
  notification,
} from "antd";
import styled from "styled-components";
import {
  SearchOutlined,
  FilterOutlined,
  CloseOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import SelectedTableCard from "../SelectedTableCard";
import ModalComponent from "../../Components/Modal";
import { static_column_expectations } from "./ColumnExpectations";
import ExpectationKwargsUpdate from "./ExpectationKwargsUpdate";
import { checkObj } from "../../util/helper";
import { clearTableExpectation } from "../../redux/slices/dataSourceSlice";

function ColumnExpectation() {
  const [columnData, setColumnData] = useState([]);
  const [tableExpectaions, setTableExpectations] = useState([]);
  const [currentTableIndex, setCurrentTableIndex] = useState(0);
  // user selected table expections
  const [selectedColumnExpectations, setSelectedColumnExpectations] = useState(
    []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState();
  const [kwargsArray, setKwargsArray] = useState([]);
  const [currentExpectation, setCurrentExpectation] = useState();
  const [editKwargsObj, setEditKwargsObj] = useState({});
  const [payloadColumnExpectations, setPayloadColumnExpectations] = useState(
    {}
  );
  const { state } = useLocation();
  const [currentTableExpectation, setCurrentTableExpectation] = useState(
    state.expectationsData[0]
  );
  const proxy = process.env.REACT_APP_PROXY;
  const expectationsuiteUrl = proxy + "/api/expectationsuite";
  const [screenLoading, setScreenLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Step } = Steps;
  const { expectationsData } = state;
  const datasource = useSelector((state) => state.datasource);

  useEffect(() => {
    const filterItems = (arr, query) => {
      return arr.filter(function (el) {
        return (
          el.expectation_type.toLowerCase().indexOf(query.toLowerCase()) !== -1 && el.expectation_type.toLowerCase() === 'expect_column_mean_to_be_between'
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
        "expect_column"
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
            selectedExpectations: [element.expectation_type],
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
      .join(",");

    const newObj = {};
    newObj["expectation_type"] = exp_arr;
  }, [columnData]);

  const columns = [
    {
      title: "Column Name",
      width: 50,
      dataIndex: "columnName",
      key: "columnName",
      fixed: "center",
    },
    {
      title: "Expectations",
      width: 60,
      dataIndex: "selectedExpectations",
      key: "selectedExpectations",
      render: (items, row) => {
        return items.map((item) => (
          <div key={item}>
            {item},{" "}
            <button
              style={{ marginLeft: "5px" }}
              className="close_btn"
              onClick={() => removeExpectation(item, row.columnName)}
            >
              <CloseOutlined />
            </button>
            <span
              style={{ marginLeft: "5px" }}
              className="edit_btn"
              onClick={() => editExpectationKwargs(item)}
            >
              <FormOutlined />
            </span>
          </div>
        ));
      },
      // render: (items) =>},
      fixed: "center",
    },
    {
      title: "Add Expectations",
      dataIndex: "columnName",
      key: "columnName",
      width: 20,
      render: (columnName) => (
        <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
          <Button type="secondary" id={columnName} onClick={handleSelected}>
            Select
          </Button>
        </div>
      ),
    },
  ];

  const removeExpectation = (value, columnName) => {
    for (let i = 0; i < columnData.length; i++) {
      const { selectedExpectations } = columnData[i];
      const getIndex = selectedExpectations.indexOf(value);
      if (getIndex > -1) {
        selectedExpectations.splice(getIndex, 1);
        break;
      }
    }
  };

  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
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
        color: "#ef7434",
      }}
    />
  );

  const suffix1 = (
    <FilterOutlined
      style={{
        fontSize: 20,
        color: "#ef7434",
      }}
    />
  );

  const handleSubmit = async () => {
    const { table_expectations, expectionsData } = datasource;
    let colPayload = [];
    columnData.forEach((element, columnIndex) => {
      // console.log('ele = ', element);
      let colExpectations = [];
      element.selectedExpectations.forEach((item) => {
        if (editKwargsObj[item] !== undefined) {
          const colObj = { column: element.columnName };
          let kwOj = {
            ...editKwargsObj[item],
            ...colObj,
          };
          colExpectations.push({
            expectation_type: item,
            kwargs: kwOj,
            meta: {},
          });
        } else {
          let kwOj = { expectation_type: item, meta: {} };

          const selectedArray = expectionsData.filter(
            (val) => val.expectation_type === item
          );
          if (selectedArray && selectedArray[columnIndex] && selectedArray[columnIndex].kwargs) {
            kwOj = {
              ...kwOj,
              kwargs: selectedArray[columnIndex].kwargs,
            };
          }
          colExpectations.push({
            ...kwOj,
          });
        }
      });
      colPayload = [...colPayload, ...colExpectations];
    });

    const payloadExpectations = {
      [currentTableExpectation?.expectation_suite_name]: colPayload,
    };

    const final_column_expectations = [payloadExpectations];

    if (!checkObj(payloadColumnExpectations)) {
      final_column_expectations.push(payloadColumnExpectations);
    }

    const params = {
      dataset_ids: state.dataset_ids,
      report_mart_id: state.reportmart_id,
      datasource_id: state.data_source_id,
      payload: {
        column_expectations: final_column_expectations,
        table_expectations: table_expectations,
      },
    };

    Axios.post(expectationsuiteUrl, params, {
      headers: { type: "reportmart" },
    })
      .then((res) => {
        setScreenLoading(false);
        dispatch(clearTableExpectation);
        navigate("/configuration/reportmart");
        message.success("Profiling Done Successfully!");
      })
      .catch((err) => {
        setScreenLoading(false);
        notification.error({
          message:
            err.message === "Request failed with status code 500"
              ? "500"
              : "Error",
          description:
            err.message === "Request failed with status code 500"
              ? "Internal Server Error"
              : err.message,
        });
      });
  };

  const handleNext = () => {
    setScreenLoading(true);
    const { expectionsData } = datasource;
    let colPayload = [];
    columnData.forEach((element) => {
      let colExpectations = [];
      element.selectedExpectations.forEach((item, colIndex) => {
        if (editKwargsObj[item] !== undefined) {
          const colObj = { column: element.columnName };
          let kwOj = {
            ...editKwargsObj[item],
            ...colObj,
          };
          colExpectations.push({
            expectation_type: item,
            kwargs: kwOj,
            meta: {},
          });
        } else {
          let kwOj = { expectation_type: item, meta: {} };

          const selectedArray = expectionsData.filter(
            (val) => val.expectation_type === item
          ); 
          if (selectedArray && selectedArray[colIndex] && selectedArray[colIndex].kwargs) {
            kwOj = {
              ...kwOj,
              kwargs: selectedArray[colIndex].kwargs,
            };
          }
          colExpectations.push({
            ...kwOj,
          });
        }
      });
      colPayload = [...colPayload, ...colExpectations];
    });

    const payloadExpectations = {
      [currentTableExpectation?.expectation_suite_name]: colPayload,
    };

    setPayloadColumnExpectations((prevState) => ({
      ...prevState,
      ...payloadExpectations,
    }));
    setCurrentTableExpectation(tableExpectaions[currentTableIndex + 1]);
    setCurrentTableIndex(currentTableIndex + 1);
    setScreenLoading(false);
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

  const editExpectationKwargs = (value) => {
    setCurrentExpectation(value);
    const selectedArray = static_column_expectations.filter(
      (item) => item.title === value
    );
    let localKwargs = "";
    if (selectedArray && selectedArray.length > 0)
      localKwargs = selectedArray[0] && selectedArray[0].kwargs;

    if (localKwargs) {
      let localKwargsArray = [];
      Object.keys(localKwargs).map((item) => {
        if (item !== "column") localKwargsArray.push(item);
      });
      setKwargsArray(localKwargsArray);
      setIsEditModalVisible(true);
    }
  };

  const handleKwargsValue = (values) => {
    setEditKwargsObj((prevState) => ({
      ...prevState,
      [currentExpectation]: {
        ...values,
      },
    }));
  };

  const handleSelected = (e) => {
    setSelectedColumn(e.target.parentNode.id);
    let columnExpectaionsFromStore = columnData.find(
      (col) => col.columnName === e.target.parentNode.id
    ).columnExpectations;
    setModalData(
      static_column_expectations
        .filter(function (el) {
          return (
            columnExpectaionsFromStore.find((x) => x === el.title) === undefined
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
  };

  let showSubmitBuuton = false;
  if (expectationsData && expectationsData.length > 0)
    showSubmitBuuton = currentTableIndex + 1 === expectationsData.length;
  if (currentTableIndex >= expectationsData.length) showSubmitBuuton = true;

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

        <Spin
          className="spin"
          tip="Profiling in Progress..."
          spinning={screenLoading}
        >
          <ExpectationsList>
            <Table
              columns={columns}
              dataSource={columnData}
              pagination={false}
              scroll={{ x: 800, y: 400 }}
              style={{ width: "100%" }}
            />
          </ExpectationsList>
        </Spin>
        <ButtonContent>
          {showSubmitBuuton ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </ButtonContent>
      </TableContent>
      {isModalVisible && (
        <ModalComponent
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          OkText="Apply"
          width="850px"
        >
          <Table
            columns={[
              {
                title: "Select All",
                dataIndex: "key",
                key: "key",
                fixed: "center",
              },
              {
                title: "Action",
                dataIndex: "edit",
                key: "edit",
              },
            ]}
            rowSelection={rowSelection}
            dataSource={modalData}
            pagination={false}
            scroll={{ x: 700, y: 400 }}
            style={{ width: "100%" }}
          />
        </ModalComponent>
      )}
      {isEditModalVisible && (
        <ExpectationKwargsUpdate
          isModalVisible={isEditModalVisible}
          setIsModalVisible={setIsEditModalVisible}
          kwargsArray={kwargsArray}
          currentExpectation={currentExpectation}
          handleKwargsValue={handleKwargsValue}
        />
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
