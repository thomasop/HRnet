import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    initialData: null,
    data: null
}

const Data = createSlice({
    name: 'Data',
    initialState,
    reducers: {
        storeData: (state, action) => {
            state.data =  {data: action.payload.data.data}
            state.initialData = action.payload.data
        },
        storeDataSearch: (state, action) => {
            state.data = action.payload.data
           // state.onSearch = true
        },
        storeDataSearchInv: (state, action) => {
            state.data = action.payload.data
           // state.onSearch = false
        },
    }
})

export default Data