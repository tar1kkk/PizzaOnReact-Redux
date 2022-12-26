import { createSlice } from "@reduxjs/toolkit";


type Sort = {
	name: string;
	sortProperty: 'rating' | 'title' | 'price';
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
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
	}
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;