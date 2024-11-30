import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import packageProductService from './packageProductService'


export const addPackage = createAsyncThunk('package/get-package',async(data,thunkAPI)=>{
    try {
        return await packageProductService.createPackage(data) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getAllPackage = createAsyncThunk('package/get-all-package',async(thunkAPI)=>{
    try {
        return await packageProductService.getAllPackage() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

const initialState = {
    packages :[],
    createPackage:"",
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const brandSlice = createSlice({
    name : "package",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        
        
        // create
        builder.addCase(addPackage.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addPackage.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "create package successfully"
            state.createPackage = action.payload
        })
        .addCase(addPackage.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        builder.addCase(getAllPackage.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllPackage.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "create package successfully"
            state.packages = action.payload
        })
        .addCase(getAllPackage.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState);
    }
})

export default brandSlice.reducer