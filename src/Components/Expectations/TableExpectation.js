import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import SelectedTableCard from "../SelectedTableCard";
import { useNavigate, useLocation } from "react-router-dom";
import { List, Steps, Popover } from "antd";
import { useDispatch } from "react-redux";
import { addTableExpectation } from "../../redux/slices/dataSourceSlice";
import ExpectationKwargsUpdate from "./ExpectationKwargsUpdate";

const TableExpectation = () => {
  // {
  //   title: "expect_table_row_count_to_equal",
  //   kwargs: {
  //     value: "",
  //   },
  // },
  // {
  //   title: "expect_value_at_index",
  // },
  // {
  //   title: "expect_table_row_count_to_equal_other_table",
  // },
  // {
  //   title: "expect_table_columns_to_match_set",
  //   kwargs: {
  //     column_set: "",
  //     exact_match: "",
  //   },
  // },
  // {
  //   title: "expect_table_columns_to_match_ordered_list",
  //   kwargs: {
  //     column_list: "",
  //   },
  // },
  // {
  //   title: "expect_table_column_count_to_equal",
  //   kwargs: {
  //     value: "",
  //   },
  // },
  // {
  //   title: "expect_table_column_count_to_be_between",
  //   kwargs: {
  //     min_value: "",
  //     max_value: "",
  //   },
  // },
  const expectation = [
    {
      title: "expect_table_row_count_to_be_between",
      kwargs: {
        min_value: "",
        max_value: "",
      },
    },
  ];

  const columns = [
    {
      width: 100,
      title: "Select All",
      dataIndex: "name",
      key: "name",
      fixed: "center",
    },
  ];

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Step } = Steps;
  const [tableExpectaions, setTableExpectations] = useState([]);
  const [currentTableExpectation, setCurrentTableExpectation] = useState(
    state.expectationsData[0]
  );
  const [currentTableIndex, setCurrentTableIndex] = useState(0);
  const [customExpectations, setCustomExpectations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // user selected table expections
  const [selectedTableExpectations, setSelectedTableExpectations] = useState(
    []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [kwargsArray, setKwargsArray] = useState();
  const [currentExpectation, setCurrentExpectation] = useState();

  const { expectationsData } = state;

  const [payload, setPayload] = useState({
    table_expectations: [],
    column_expectations: [],
  });

  useEffect(() => {
    const filterItems = (arr, query) => {
      return arr.filter(function (el) {
        return (
          el.expectation_type.toLowerCase().indexOf(query.toLowerCase()) !== -1 && el.expectation_type.toLowerCase() === 'expect_table_row_count_to_be_between'
        );
      });
    };
    if (
      currentTableIndex >= 0 &&
      currentTableIndex < state.expectationsData.length
    ) {
      setTableExpectations(state.expectationsData);
      setCurrentTableExpectation(state.expectationsData[currentTableIndex]);
      setSelectedTableExpectations(
        filterItems(
          state && state.expectationsData[currentTableIndex].expectations,
          "expect_table"
        )
      );
    }
  }, [state, currentTableIndex, tableExpectaions]);

  useEffect(() => {
    const newArr = [];
    // send all datasets for perstitence and mark selected ones
    expectation.forEach((e) => {
      newArr.push({
        key: e.title,
        name: e.title,
      });
    });
    setCustomExpectations(newArr);
  }, []);

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

  const handleNext = async (e) => {
    let expectionsPayload = {};
    if (expectationsData && expectationsData.length > 0) {
      const { expectation_suite_name } = expectationsData[currentTableIndex];
      expectionsPayload = {
        [expectation_suite_name]: [...selectedTableExpectations],
      };

      dispatch(addTableExpectation(expectionsPayload));
    }

    setCurrentTableExpectation(tableExpectaions[currentTableIndex + 1]);
    setCurrentTableIndex(currentTableIndex + 1);
  };

  const handleSubmit = async () => {
    let expectionsPayload = {};
    if (
      expectationsData &&
      expectationsData.length > 0 &&
      currentTableIndex + 1 === expectationsData.length
    ) {
      const { expectation_suite_name } = expectationsData[currentTableIndex];
      expectionsPayload = {
        [expectation_suite_name]: [...selectedTableExpectations],
      };

      console.log("ex payload = ", expectionsPayload);
      dispatch(addTableExpectation(expectionsPayload));
      setCurrentTableIndex(currentTableIndex + 1);

      navigate("/configuration/datasource/martdetails/columnchecks", {
        state: { ...state, payload: payload },
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

  const handleEditButton = (data) => {
    const selectTableExpRow = selectedTableExpectations.filter(
      (el) => el.expectation_type === data
    );

    let kwargsarrray = [];

    if (selectTableExpRow && selectTableExpRow.length > 0) {
      if (selectTableExpRow[0].kwargs) {
        kwargsarrray = Object.keys(selectTableExpRow[0].kwargs);
      }
    }
    setCurrentExpectation(data);
    setKwargsArray(kwargsarrray);
    setIsModalVisible(true);
  };

  const handleKwargsValue = (values) => {
    const getIndex = selectedTableExpectations.findIndex(
      (el) => el.expectation_type === currentExpectation
    );

    if (getIndex >= 0) {
      selectedTableExpectations[getIndex].kwargs = values;
    }
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
        <h4>Default Selected Table Expectation</h4>
        <DefaultExpectations>
          <List
            dataSource={selectedTableExpectations}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    key={item.expectation_type}
                    icon={<EditOutlined />}
                    onClick={() => handleEditButton(item.expectation_type)}
                  ></Button>,
                  <Button
                    key={item.expectation_type}
                    id={item.expectation_type}
                    value={item.expectation_type}
                    onClick={(e) => {
                      const newSelectedTableExpectations =
                        selectedTableExpectations.filter(
                          (el) => el.expectation_type !== e.target.id
                        );
                      setSelectedTableExpectations(
                        newSelectedTableExpectations
                      );
                      e.preventDefault();
                    }}
                    icon={<DeleteOutlined />}
                  ></Button>,
                ]}
              >
                <List.Item.Meta title={<a>{item.expectation_type}</a>} />
              </List.Item>
            )}
          />
        </DefaultExpectations>
      </CardComponent>
      <TableContent>
        <Header>
          <h1>Select Table Expecations</h1>
          <Steps progressDot={customDot} current={currentTableIndex}>
            {tableExpectaions.map((tableExpectaion, index) => (
              <Step
                key={index}
                title={tableExpectaion?.expectation_suite_name}
              />
            ))}
          </Steps>
        </Header>
        <ExpectationsList>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={customExpectations}
            pagination={false}
            scroll={{ x: 800, y: 400 }}
            style={{ width: 900, marginTop: 30 }}
          />
        </ExpectationsList>
        <ButtonContent>
          <Button
            type="primary"
            onClick={(e) => {
              // TODO fix this with dynamic content.
              let data = selectedRowKeys.map((key) => {
                return {
                  expectation_type: key,
                  kwargs: {},
                  meta: {},
                };
              });

              let newSelectedTableExpectations = [
                ...selectedTableExpectations,
                ...data,
              ];
              setSelectedTableExpectations(newSelectedTableExpectations);
            }}
          >
            Apply
          </Button>
          {showSubmitBuuton ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}

          {/* <Button onClick={handleNext}>Next</Button> */}
        </ButtonContent>
      </TableContent>
      {isModalVisible && (
        <ExpectationKwargsUpdate
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          kwargsArray={kwargsArray}
          currentExpectation={currentExpectation}
          handleKwargsValue={handleKwargsValue}
        />
      )}
    </Tableview>
  );
};
export default TableExpectation;

const Tableview = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const CardComponent = styled.div`
  display: flex;
  flex: 3;
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
  flex: 7;
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

const DefaultExpectations = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
  padding: 0 16px;
  border: 1px solid black;
  border-radius: 10px;
  filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.5));
`;
const ExpectationsList = styled.div`
  height: 500px;
  width: 80%;
  overflow: auto;
  padding: 0 16px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 10px;
  filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.5));
`;
const ButtonContent = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;
