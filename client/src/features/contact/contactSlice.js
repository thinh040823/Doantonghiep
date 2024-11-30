import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { contactService } from "./contactService";


export const getAllContact = createAsyncThunk("contact/getall",async(thunkApi)=>{
    try{
        return await contactService.getAllContact()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getContact = createAsyncThunk("contact/get-contact",async(id,thunkApi)=>{
    try{
        return await contactService.getContact(id)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})
export const addContact = createAsyncThunk("contact/add-contact",async(data,thunkApi)=>{
    try{
        return await contactService.createContact(data)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    contacts :"",
    add:"",
    aContact:"",
    isError:false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const productSlice = createSlice({
    name : "contacts",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllContact.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllContact.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.contacts=action.payload
        })
        .addCase(getAllContact.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(addContact.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(addContact.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.add=action.payload
        })
        .addCase(addContact.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(getContact.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getContact.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.aContact=action.payload
        })
        .addCase(getContact.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default productSlice.reducer