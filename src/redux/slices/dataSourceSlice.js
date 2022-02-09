import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  expectionsData: {},
  table_expectations: [],
  column_expectations: [],
};

export const dataSourceSlice = createSlice({
  name: 'datasourcetable',
  initialState,
  reducers: {
    addDataSource: (state, action) => {
      const payloadData = action.payload;
      state.data = [...state.data, ...payloadData];
    },

    addExpectionsIds: (state, action) => {
      state.expectionsData = { ...state.expectionsData, ...action.payload };
      console.log('setfinal = ', action);
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
  addDataSource,
  addExpectionsIds,
  addExpectationData,
  addTableExpectation,
  addColumnExpectation,
} = dataSourceSlice.actions;

export default dataSourceSlice.reducer;
