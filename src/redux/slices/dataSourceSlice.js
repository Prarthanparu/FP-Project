import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expectionsData: {},
  table_expectations: [],
  column_expectations: [],
};

export const dataSourceSlice = createSlice({
  name: 'datasourcetable',
  initialState,
  reducers: {
    addExpectionsIds: (state, action) => {
      state.expectionsData = { ...state.expectionsData, ...action.payload };
    },
    addExpectationData: (state, action) => {
      state.expectionsData.results = {
        ...state.expectionsData.results,
        ...action.payload,
      };
    },
    addTableExpectation: (state, action) => {
      state.table_expectations = [...state.table_expectations, action.payload];
    },
    addColumnExpectation: (state, action) => {
      state.column_expectations = [
        ...state.column_expectations,
        ...action.payload,
      ];
    },
  },
});

export const {
  addExpectionsIds,
  addExpectationData,
  addTableExpectation,
  addColumnExpectation,
} = dataSourceSlice.actions;

export default dataSourceSlice.reducer;
