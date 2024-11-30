import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import supplierService from './supplierService'


export const getSupplier = createAsyncThunk('supplier/get-supplier',async(thunkAPI)=>{
    try {
        return await supplierService.getSupplier() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getIdSupplier = createAsyncThunk('supplier/get-id-supplier',async(id,thunkAPI)=>{
    try {
        return await supplierService.getIdSupplier(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateSupplier = createAsyncThunk('supplier/update-supplier',async(supplierData,thunkAPI)=>{
    console.log(supplierData)
    try {
        return await supplierService.updateSupplier(supplierData) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createSupplier = createAsyncThunk('supplier/create-supplier',async(supplier,thunkAPI)=>{
    try {
        return await supplierService.createSupplier(supplier) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteSupplier = createAsyncThunk('supplier/delete-supplier',async(id,thunkAPI)=>{
    try {
        return await supplierService.deleteSupplier(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

const initialState = {
    suppliers :[],
    createSupplier:"",
    supplierName:"",
    updateName:"",
    deleteSupplier:{},
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const supplierSlice = createSlice({
    name : "supplier",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getSupplier.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSupplier.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all supplier successfully"
            state.suppliers = action.payload
        })
        .addCase(getSupplier.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        
        // create
        builder.addCase(createSupplier.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createSupplier.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "createGet all supplier successfully"
            state.createSupplier = action.payload
        })
        .addCase(createSupplier.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // get id 
        builder.addCase(getIdSupplier.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getIdSupplier.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get id supplier successfully"
            state.supplierName = action.payload?.getsupplier?.title
        })
        .addCase(getIdSupplier.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // update 
        builder.addCase(updateSupplier.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateSupplier.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "update supplier successfully"
            state.updateName = action.payload?.udsupplier
            state.isLoading = false
        })
        .addCase(updateSupplier.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // delete 
        builder.addCase(deleteSupplier.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteSupplier.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "delete supplier successfully"
            state.deleteSupplier = action.payload
            state.isLoading = false
        })
        .addCase(deleteSupplier.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        .addCase(resetState, () => initialState);
    }
})

export default supplierSlice.reducer