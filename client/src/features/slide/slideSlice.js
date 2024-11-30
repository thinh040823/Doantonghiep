import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { SlideService } from "./slideService";


export const getAllSlide = createAsyncThunk("slide/getall",async(thunkApi)=>{
    try{
        return await SlideService.getAllSlide()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    slides :"",
    isError:false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const productSlice = createSlice({
    name : "slide",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllSlide.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllSlide.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.slides=action.payload
        })
        .addCase(getAllSlide.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default productSlice.reducer