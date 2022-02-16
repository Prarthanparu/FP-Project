import { Line } from "@ant-design/plots";
import { Space, Spin } from "antd";
import Axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalComponent from "../Components/Modal";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const GraphModal = (props) => {
  const proxy = process.env.REACT_APP_PROXY;
  const [tableData, setTableData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = proxy + "/api/quality_check_results";
    setIsLoading(true);
    Axios.get(url, { headers: { report_mart_id: 44, dataset_id: 545 } })
      .then((res) => {
        apiHandler(res.data.result);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);
  const apiHandler = (res) => {
    let current = res.expect_table_row_count_to_be_between.current_Expectations;
    const tableData = Object.keys(current.Observed_row_count).map((key) => {
      return {
        category: `${current.month[key]}-${current.year[key]}}`,
        current: current.Observed_row_count[key],
        month: months[key],
      };
    });
    let current1 = res.expect_column_mean_to_be_between.current_Expectations;
    let history1 = res.expect_column_mean_to_be_between.history_expectations;
    const columnData = Object.keys(current1.Observed_Value).map((key, item) => {
      return {
        history: history1.Observed_Value[key],
        category: `${current1.month[key]}-${current1.year[key]}}`,
        current: current1.Observed_Value[key],
        month: months[key],
      };
    });
    setIsLoading(false);
    setTableData(tableData);
    setColumnData(columnData);
  };
  const config = {
    xField: "month",
    yField: "current",
    height: 200,
    width: "100%",
    color: ["#1979C9", "#D62A0D"],
    title: "asdfasdfasdf",
    legend: {
      layout: "horizontal",
      position: "right",
    },
    style: { padding: "8px", border: "1px solid #c5c5c5" },
  };
  const tableConfig = {
    ...config,
    data: tableData,
  };
  const columnConfig = {
    ...config,
    data: columnData,
  };
  return (
    <ModalComponent width="461.15px" {...props}>
      <Spin spinning={isLoading}>
        <Title>Table Expectation</Title>
        <Line {...tableConfig} />
        <br />
        <Title>Column Expectation</Title>
        <Line {...columnConfig} />
      </Spin>
    </ModalComponent>
  );
};
export default GraphModal;
const Title = styled.h5`
  text-align: center;
`;
