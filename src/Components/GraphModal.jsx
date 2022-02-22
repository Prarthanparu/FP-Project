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
  const [columnData, setcolumnData] = useState([]);
  const [columnHistoryData, setColumnHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = proxy + "/api/quality_check_results";
    setIsLoading(true);
    Axios.get(url, { headers: { report_mart_id: props.reportMartId, dataset_id: props.datasetId } })
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
    let history = res.expect_table_row_count_to_be_between.history_expectations;
    const table = [];
    Object.keys(current.Observed_row_count).map((key) => {
      table.push(
        {
          date: `${months[key]}-${current.year[key]}`,
          category: "observed",
          value: current.Observed_row_count[key],
        },
        {
          date: `${months[key]}-${current.year[key]}`,
          category: "upper",
          value: current.upper_bound_std[key],
        },
        {
          date: `${months[key]}-${current.year[key]}`,
          category: "lower",
          value: current.lower_bound_std[key],
        },
        {
          date: `${months[key]}-${current.year[key]}`,
          category: "history_observed",
          value: history.Observed_row_count[key],
        }
      );
    });
    let current1 = res.expect_column_mean_to_be_between.current_Expectations;
    let history1 = res.expect_column_mean_to_be_between.history_expectations;
    const column = [];
    Object.keys(current1.Observed_Value).map((key) => {
      column.push(
        {
          category: "observed",
          value: current1.Observed_Value[key],
          date: `${months[key]}-${current1.year[key]}`,
        },
        {
          category: "upper_bound",
          value: history1.upper_bound_std[key],
          date: `${months[key]}-${current1.year[key]}`,
        },
        {
          category: "lower_bound",
          value: history1.lower_bound_std[key],
          date: `${months[key]}-${current1.year[key]}`,
        },
        {
          category: "observed_history",
          value: history1.Observed_Value[key],
          date: `${months[key]}-${current1.year[key]}`,
        }
      );
    });
    setIsLoading(false);
    setTableData(table);
    setcolumnData(column);
  };
  const config = {
    height: 200,
    width: "100%",
    xField: "date",
    yField: "value",
    seriesField: "category",
    color: ["#1979C9", "#D62A0D", "#FAA219", "#FAD219"],
    legend: {
      layout: "horizontal",
      position: "top",
    },
    xAxis: {
      title: {
        text: "2021 Year and Month",
      },
    },
    yAxis: {
      title: {
        text: "Observed Values",
      },
    },
    style: { padding: "8px", border: "1px solid gray" },
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
    <ModalComponent OkText="Ok" width="661.15px" {...props}>
      <Spin spinning={isLoading}>
        {props.type === "table" ? (
          <>
            <Title>Table Expectation</Title>
            <Line {...tableConfig} />
          </>
        ) : (
          <>
            <Title>Column Expectation</Title>
            <Line {...columnConfig} />
          </>
        )}
        <br />
      </Spin>
    </ModalComponent>
  );
};
export default GraphModal;
const Title = styled.h5`
  text-align: center;
`;
