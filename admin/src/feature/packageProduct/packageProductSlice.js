import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import packageProductService from './packageProductService'


export const addPackage = createAsyncThunk('package/add-package',async(data,thunkAPI)=>{
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
export const getPackage = createAsyncThunk('package/get-package',async(id,thunkAPI)=>{
    try {
        return await packageProductService.getPackage(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    packages :[],
    APackage:"",
    createPackage:"",
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:"",
    history: []
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
            // state.history.push(action.payload);
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
            state.message = "get all package successfully"
            state.packages = action.payload
        })
        .addCase(getAllPackage.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        builder.addCase(getPackage.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getPackage.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "get a package successfully"
            state.APackage = action.payload
        })
        .addCase(getPackage.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState);
    }
})

export default brandSlice.reducer