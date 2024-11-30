import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { productService } from "./productService";


export const getAllProduct = createAsyncThunk("products/getall",async(thunkApi)=>{
    try{
        return await productService.getAllProduct()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getAProduct = createAsyncThunk("products/get-product",async(id,thunkApi)=>{
    try{
        return await productService.getAProduct(id)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getSlugProduct = createAsyncThunk("products/get-slug-product",async(slug,thunkApi)=>{
    try{
        return await productService.getSlugProduct(slug)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})
export const ratingProduct = createAsyncThunk("products/rating-product",async(data,thunkApi)=>{
    try{
        return await productService.ratingProduct(data)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const searchInput = createAsyncThunk("products/get-search-product",async(keyword,thunkApi)=>{
    try{
        return await productService.search(keyword)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    products :"",
    AProduct:"",
    slugProduct:"",
    rating:"",
    isError:false,
    isSuccess : false,
    isLoading : false,
    search:"",
    message : ""
}

export const productSlice = createSlice({
    name : "product",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProduct.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.products=action.payload
        })
        .addCase(getAllProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        
        builder.addCase(getAProduct.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.AProduct=action.payload
        })
        .addCase(getAProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(getSlugProduct.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getSlugProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.slugProduct=action.payload
        })
        .addCase(getSlugProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(searchInput.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(searchInput.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.search=action.payload
        })
        .addCase(searchInput.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(ratingProduct.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(ratingProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.rating=action.payload
        })
        .addCase(ratingProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        
    }
})

export default productSlice.reducer