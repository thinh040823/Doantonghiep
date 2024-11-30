import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { categoryBlogService } from "./categoryBlogService";


export const getAllCategorylog = createAsyncThunk("categoryblog/get-all-categoryblog",async(thunkApi)=>{
    try{
        return await categoryBlogService.getAllCategoryBlog()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getCategoryBlog = createAsyncThunk("categoryblog/get-categoryblog",async(id,thunkApi)=>{
    try{
        return await categoryBlogService.getCategoryBlog(id)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    categoryBlog :"",
    aCategoryBlog:"",
    isError:false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const productSlice = createSlice({
    name : "CategoryBlog",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCategorylog.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllCategorylog.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.categoryBlog=action.payload
        })
        .addCase(getAllCategorylog.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(getCategoryBlog.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getCategoryBlog.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.aCategoryBlog=action.payload
        })
        .addCase(getCategoryBlog.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default productSlice.reducer