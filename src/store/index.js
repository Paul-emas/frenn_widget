import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../slices/app';

export const store = configureStore({
	reducer: {
		app: appSlice,
	},
});
