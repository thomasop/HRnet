import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onSearch: false,
    nbShow: 10,
    currentPage: 1,
    sortBy: ["", ""],
}

const DataTableFilter = createSlice({
    name: 'DataTableFilter',
    initialState,
    reducers: {
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
        resetData: (state) => {
            state.sortBy = ["", ""]
            state.currentPage = 1
            state.nbShow = 10
            state.onSearch = false
        }
     }
})

export default DataTableFilter