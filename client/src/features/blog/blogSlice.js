import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { blogService } from "./blogService";


export const getAllBlog = createAsyncThunk("blog/getall",async(thunkApi)=>{
    try{
        return await blogService.getAllBlog()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getBlog = createAsyncThunk("blog/get-blog",async(id,thunkApi)=>{
    try{
        return await blogService.getBlog(id)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    blogs :"",
    aBlog:"",
    isError:false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const productSlice = createSlice({
    name : "blogs",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBlog.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllBlog.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogs=action.payload
        })
        .addCase(getAllBlog.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(getBlog.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getBlog.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.aBlog=action.payload
        })
        .addCase(getBlog.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default productSlice.reducer