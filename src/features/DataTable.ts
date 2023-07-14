import { createSlice } from "@reduxjs/toolkit";

interface StateType {
    initialData: DataType | null,
    data: DataType | null,
}

interface DataType {
    data: any[]
}

const initialState: StateType = {
    initialData: null,
    data: null
}

const DataTable = createSlice({
    name: 'DataTable',
    initialState,
    reducers: {
        storeDataTable: (state, action) => {
            state.data =  {data: action.payload.data.data}
            state.initialData = action.payload.data
        },
        changeDataTable: (state, action) => {
            state.data = action.payload.data
        },
        storeDataTableSearch: (state, action) => {
            state.data = action.payload.data
        },
        resetDataTable: (state) => {
            state.data = state.initialData
        }
    }
})

export default DataTable