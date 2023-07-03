import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: false
}

const Modal = createSlice({
    name: "Modal",
    initialState,
    reducers: {
        open: (state) => {
            state.display = true
        },
        close: (state) => {
            state.display = false
        }
    }
})

export default Modal