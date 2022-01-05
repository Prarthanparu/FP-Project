import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Datasources from "./Pages/Datasources";
import ConfigTable from "./Pages/ConfigTable";
import DatasourceTable from "./Pages/DatasourceTable";
import MartDetails from "./Pages/MartDetails";
import QualityChecksView from "./Pages/QualityChecksView";
import TableExpectation from "./Components/Expectations/TableExpectation";
import ColumnExpectation from "./Components/Expectations/ColumnExpectation";
import ReportingMart from "./Pages/ReportingMart"
import DatasourceMartDetails from "./Pages/DatasourceMartTable";

function AppBody() {
  return (
    <Routes>
      <Route path="/" element={<Datasources />} exact />
      <Route path="/configuration/:id" element={<ConfigTable />} />
      <Route
        path="/configuration/:id/datasourcetable/:responseid"
        element={<DatasourceTable />}
      />
      <Route
        path="/configuration/datasource/martdetails/:id/datasourcetable/:responseid/:tableVariables"
        element={<MartDetails />}
      />
      <Route
        path="/configuration/datasource/martdetails"
        element={<ReportingMart />}
      />
      <Route
        path="/configuration/datasource/marttable"
        element={<DatasourceMartDetails />}
      />
      <Route
        path="/configuration/datasource/martdetails/qualitychecks"
        element={<QualityChecksView />}
      />
      <Route
        path="/configuration/datasource/martdetails/qualitychecks/tablechecks"
        element={<TableExpectation />}
      />
      <Route
        path="/configuration/datasource/martdetails/qualitychecks/columnchecks"
        element={<ColumnExpectation />}
      />
    </Routes>
  );
}
export default AppBody;
