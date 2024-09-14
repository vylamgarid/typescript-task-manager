import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    filter: 'all' | 'completed' | 'pending';
}

const initialFilterState: FilterState = {
    filter: 'all',
};

// Slice
const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        setFilter: (state, action: PayloadAction<FilterState['filter']>) => {
            state.filter = action.payload;
        },
    },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;