import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../constants/constants';
import { StatsItem, MerchantItem, DashboardState, CategoryStats } from '../../models/dashboardModels';

const initialState: DashboardState = {
  activeFilter: 'active',
  statsData: [],
  merchantsList: [],
  activeStatus: '',
  searchQuery:'',
  searchedMerchantsList: [],
};

const dashboardSlice = createSlice({
  name: CONSTANTS.REDUCERS.DASHBOARD,
  initialState,
  reducers: {
    updateActiveFilter(state, action: PayloadAction<'active' | 'favourites' | 'closed'>) {
      state.activeFilter = action.payload;
    },
    updateStatsData(state, action: PayloadAction<CategoryStats[]>) {
      state.statsData = action.payload;
    },
    updateMerchantsList(state, action: PayloadAction<MerchantItem[]>) {
      state.merchantsList = action.payload;
    },
    updateActiveStatus(state, action: PayloadAction<string>) {
      state.activeStatus = action.payload;
    },
    updateSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    updateSearchedMerchantsList(state, action: PayloadAction<MerchantItem[]>) {
      state.searchedMerchantsList = action.payload;
    },
  },
});

export const { updateActiveFilter, updateStatsData, updateMerchantsList, updateActiveStatus, updateSearchQuery, updateSearchedMerchantsList } = dashboardSlice.actions;
export default dashboardSlice.reducer;