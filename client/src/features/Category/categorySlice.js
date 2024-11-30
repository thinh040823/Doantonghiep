import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { categoryService } from "./categoryService";


export const getAllCategory = createAsyncThunk("category/get-all-category",async(thunkApi)=>{
    try{
        return await categoryService.getAllCategory()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getCategory = createAsyncThunk("category/get-category",async(id,thunkApi)=>{
    try{
        return await categoryService.getCategory(id)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    category :"",
    aCategory:"",
    isError:false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const productSlice = createSlice({
    name : "Category",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCategory.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.category=action.payload
        })
        .addCase(getAllCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(getCategory.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.aCategory=action.payload
        })
        .addCase(getCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default productSlice.reducer