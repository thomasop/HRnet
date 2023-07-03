import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onSearch: false,
    initialData: null,
    data: null,
    nbShow: 10,
    currentPage: 1,
    sortBy: ["", ""],
}

const Array = createSlice({
    name: 'Array',
    initialState,
    reducers: {
        true: (state) => {
            state.onSearch = true
        },
        false: (state) => {
            state.onSearch = false
        },
        storeData: (state, action) => {
            state.data =  {data: action.payload.data.data}
            state.initialData = action.payload.data
        },
        storeDataSearch: (state, action) => {
            state.data = action.payload.data
            state.onSearch = true
        },
        storeDataSearchInv: (state, action) => {
            state.data = action.payload.data
            state.onSearch = false
        },
        changeNbShow: (state, action) => {
            state.nbShow = action.payload.nbShow
            state.currentPage = 1
        },
        nextPage: (state) => {
            state.currentPage = state.currentPage + 1
        },
        previousPage: (state) => {
            state.currentPage = state.currentPage - 1
        },
        selectPage: (state, action) => {
            state.currentPage = action.payload.page
        },
        changeSortBy: (state, action) => {
            state.sortBy = action.payload.sortBy
        },
    }
})

export default Array