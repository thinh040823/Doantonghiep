import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import voucherService from './voucherService'


export const addVoucher = createAsyncThunk('voucher/get-voucher',async(data,thunkAPI)=>{
    try {
        return await voucherService.createVoucher(data) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getAllVoucher = createAsyncThunk('voucher/get-all-voucher',async(thunkAPI)=>{
    try {
        return await voucherService.getAllVoucher() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

const initialState = {
    voucher :[],
    createVoucher:"",
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const voucherSlice = createSlice({
    name : "Voucher",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        
        
        // create
        builder.addCase(addVoucher.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addVoucher.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "create voucher successfully"
            state.createVoucher = action.payload
        })
        .addCase(addVoucher.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        builder.addCase(getAllVoucher.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllVoucher.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "create package successfully"
            state.voucher = action.payload
        })
        .addCase(getAllVoucher.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState);
    }
})

export default voucherSlice.reducer