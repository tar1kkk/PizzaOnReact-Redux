import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from './cartSlice';


type FetchPizzasArgs = {
	categoryId: number;
	sortType: string;
	currentPage: number;
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: FetchPizzasArgs) => {
	const { categoryId, sortType, currentPage } = params;
	const { data } = await axios.get<Pizza[]>(
		`https://6357bebfc26aac906f3175b4.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''
		}&sortBy=${sortType}&order=desc`);
	return data as Pizza[];
}
);

type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
}


interface PizzaSliceState {
	items: Pizza[];
	status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
	items: [],
	status: 'loading',
};


const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = 'loading';
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		});
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = 'error';
			state.items = [];
		});
	}
	// extraReducers: {
	// 	[fetchPizzas.pending]: (state) => {
	// 		state.status = 'loading';
	// 		state.items = [];
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload;
	// 		state.status = 'success';
	// 	},
	// 	[fetchPizzas.rejected]: (state) => {
	// 		state.status = 'error';
	// 		state.items = [];
	// 	}
	// }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;