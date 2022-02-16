import { Line } from "@ant-design/plots";
import { Spin } from "antd";
import Axios from "axios";
import { useEffect, useState } from "react";
import ModalComponent from "../Components/Modal";
import json from "./data.json";
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = proxy + "/api/quality_check_results";
    setIsLoading(true);
    console.log({ json });
    let obj =
      json.result.expect_table_row_count_to_be_between.current_Expectations;
    const columnData = Object.keys(obj.Observed_row_count).map((key, item) => {
      return {
        date: `${obj.month[key]}-${obj.year[key]}}`,
        value: obj.Observed_row_count[key],
        month: months[key],
      };
    });
    setData(columnData);
    console.log(columnData);
    // Axios.get(url, { headers: { report_mart_id: 44, dataset_id: 545 } })
    //   .then((res) => {
    //     setIsLoading(false);
    //     console.log({ res, columnData });
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     console.log(err);
    //   });
  }, []);
  const config = {
    data,
    xField: "date",
    yField: "value",
  };
  return (
    <ModalComponent OkText="Create" width="461.15px" {...props}>
      <Spin spinning={isLoading}></Spin>
      GraphModal
      <Line {...config} />
    </ModalComponent>
  );
};
export default GraphModal;
