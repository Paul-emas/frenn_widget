import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  pageLoading: false,
  showSpinner: false,
  error: null,
  merchantData: null,
  creditLimit: null,
  otpData: null,
  activePage: "new_user",
  activeTab: "new_user",
  isExisting: false,
  openPaystack: false,
};

const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPageLoading: (state, { payload }) => {
      state.pageLoading = payload;
    },
    setActivePage: (state, { payload }) => {
      state.activePage = payload;
    },
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    setMerchantData: (state, { payload }) => {
      state.merchantData = payload;
    },
    setIsExiting: (state, { payload }) => {
      state.isExisting = payload;
    },
    setOpenPaystack: (state, { payload }) => {
      state.openPaystack = payload;
    },
    setOtpData: (state, { payload }) => {
      state.otpData = payload;
    },
    setCreditLimit: (state, { payload }) => {
      state.creditLimit = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setShowSpinner: (state, { payload }) => {
      state.showSpinner = payload;
    },
  },
});

export const {
  setPageLoading,
  setActivePage,
  setActiveTab,
  setOpenPaystack,
  setMerchantData,
  setIsExiting,
  setOtpData,
  setCreditLimit,
  setError,
  setShowSpinner,
} = appSlice.actions;

export const appSelector = (state) => state.app;
export default appSlice.reducer;
