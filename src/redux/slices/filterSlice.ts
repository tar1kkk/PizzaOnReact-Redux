import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type Sort = {
	name: string;
	sortProperty: string;
}

interface FilterSliceState {
	categoryId: number;
	currentPage: number;
	sort: Sort;
}


const initialState: FilterSliceState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
};


const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
	}
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;