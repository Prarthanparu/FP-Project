import React from "react";
import { Routes, Route } from "react-router-dom";
import Datasources from "./Pages/Datasources";
import ConfigTable from "./Pages/ConfigTable";
import DatasourceTable from "./Pages/DatasourceTable";
import MartDetails from "./Pages/MartDetails";
import QualityChecksView from "./Pages/QualityChecksView";
import TableExpectation from "./Components/Expectations/TableExpectation";
import ColumnExpectation from "./Components/Expectations/ColumnExpectation";
import ReportingMart from "./Pages/ReportingMart";
import Datadocs from "./Pages/Datadocs";
import DetailedView from "./Pages/DetailedView";
import DetailedViewGraph from "./Pages/DetailedViewGraph";
import Setting from "./Pages/Setting";

function AppBody() {
  return (
    <Routes>
      <Route path="/" element={<Datasources />} exact />
      <Route path="/configuration/:id" element={<ConfigTable />} />
      <Route
        path="/configuration/:id/datasourcetable/:responseid"
        element={<DatasourceTable />}
      />
      <Route path="/configuration/martdetails" element={<MartDetails />} />
      <Route path="/configuration/reportmart" element={<ReportingMart />} />
      <Route
        path="/configuration/reportmart/refresh"
        element={<ReportingMart />}
      />

      <Route
        path="/configuration/datasource/martdetails/qualitychecks"
        element={<QualityChecksView />}
      />

      <Route
        path="/configuration/datasource/martdetails/tablechecks"
        element={<TableExpectation />}
      />
      <Route
        path="/configuration/datasource/martdetails/columnchecks"
        element={<ColumnExpectation />}
      />
      <Route
        path="/configuration/datasource/martdetails/columnchecks/datadocs"
        element={<Datadocs />}
      />
      <Route
        path="/configuration/reportmart/detailedview"
        element={<DetailedView />}
      />
      <Route
        path="/configuration/reportmart/detailedview/individualdata"
        element={<DetailedViewGraph />}
      />
      <Route path="/configuration/setting" element={<Setting />} />
    </Routes>
  );
}
export default AppBody;
