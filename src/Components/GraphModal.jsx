import { Line } from "@ant-design/plots";
import { Space, Spin } from "antd";
import Axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalComponent from "../Components/Modal";
const months = [];
months[1] = "Jan";
months[2] = "Feb";
months[3] = "Mar";
months[4] = "Apr";
months[5] = "May";
months[6] = "Jun";
months[7] = "Jul";
months[8] = "Aug";
months[9] = "Sep";
months[10] = "Oct";
months[11] = "Nov";
months[12] = "Dec";

const GraphModal = (props) => {
  const proxy = process.env.REACT_APP_PROXY;
  const [tableData, setTableData] = useState([]);
  const [columnData, setcolumnData] = useState([]);
  const [columnHistoryData, setColumnHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = proxy + "/api/quality_check_results";
    setIsLoading(true);
    Axios.get(url, {
      headers: {
        report_mart_id: props.reportMartId,
        dataset_id: props.datasetId,
        execution_id: props.execution_id,
      },
    })
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
    Object.keys(current.Observed_row_count).map((key, index) => {
      const month = current.month[key];
      table.push(
        {
          category: "observed",
          value: current.Observed_row_count[key],
          date: `${months[month]}-${current.year[index]}`,
        },
        {
          category: "history_observed",
          value: history.Observed_row_count[index+1],
          date: `${months[month]}-${current.year[index]}`,
        },
        {
          category: "upper_bound",
          value: history.upper_bound_std[index+1],
          date: `${months[month]}-${current.year[index]}`,
        },
        {
          category: "lower_bound",
          value: history.lower_bound_std[index+1],
          date: `${months[month]}-${current.year[index]}`,
        }
      );
    });

    let current1 = res.expect_column_mean_to_be_between.current_Expectations;
    let history1 = res.expect_column_mean_to_be_between.history_expectations;
    const column = [];
    let columnIndexValue = -1;
    Object.keys(current1.current_Expectations).map((key, index) => {
      if (
        current1.current_Expectations[key] &&
        current1.current_Expectations[key].length > 0 &&
        current1.current_Expectations[key][0].column === props.type
      ) {
        columnIndexValue = index;
      }
    });

    if (columnIndexValue > -1) {
      const historyExpectations =
        history1.history_expectations[columnIndexValue];
      current1.current_Expectations[columnIndexValue].map((item, index) => {
        if(historyExpectations[index + 1]) {
          column.push(
            {
              category: "observed",
              value: item.Observed_Value,
              date: `${months[item.month]}-${item.year}`,
            },
            {
              category: "history_observed",
              value: historyExpectations[index + 1].Observed_Value,
              date: `${months[item.month]}-${item.year}`,
            },
            {
              category: "upper_bound",
              value: historyExpectations[index + 1].upper_bound_std,
              date: `${months[item.month]}-${item.year}`,
            },
            {
              category: "lower_bound",
              value: historyExpectations[index + 1].lower_bound_std,
              date: `${months[item.month]}-${item.year}`,
            }
          );
        } else {
          column.push(
            {
              category: "observed",
              value: item.Observed_Value,
              date: `${months[item.month]}-${item.year}`,
            },
          )
        }
      });
    }
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
