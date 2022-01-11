import React from "react";
import { Routes, Route } from "react-router-dom";
import Datasources from "./Pages/Datasources";
import ConfigTable from "./Pages/ConfigTable";
import DatasourceTable from "./Pages/DatasourceTable";
import MartDetails from "./Pages/MartDetails";
import QualityChecksView from "./Pages/QualityChecksView";
import TableExpectation from "./Components/Expectations/TableExpectation";
import ColumnExpectation from "./Components/Expectations/ColumnExpectation";
import ReportingMartBody from "./Pages/ReportingMart";
import Datadocs from "./Pages/Datadocs";

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
      <Route path="/configuration/reportmart" element={<ReportingMartBody />} />

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
    </Routes>
  );
}
export default AppBody;
