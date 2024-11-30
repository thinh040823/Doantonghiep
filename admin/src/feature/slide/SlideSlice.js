import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import SlideService from './SlideService'


export const getSlides = createAsyncThunk('Slide/get-Slide',async(thunkAPI)=>{
    try {
        return await SlideService.getSlide() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getIdSlide = createAsyncThunk('Slide/get-id-Slide',async(id,thunkAPI)=>{
    try {
        return await SlideService.getIdSlide(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateSlide = createAsyncThunk('Slide/update-Slide',async(SlideData,thunkAPI)=>{
    console.log(SlideData)
    try {
        return await SlideService.updateSlide(SlideData) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createSlide = createAsyncThunk('Slide/create-Slide',async(Slide,thunkAPI)=>{
    try {
        return await SlideService.createSlide(Slide) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteSlide = createAsyncThunk('Slide/delete-Slide',async(id,thunkAPI)=>{
    try {
        return await SlideService.deleteSlide(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

const initialState = {
    Slides :[],
    createSlide:"",
    aSlide:"",
    SlideName:"",
    updateName:"",
    deleteSlide:{},
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const SlideSlice = createSlice({
    name : "Slide",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getSlides.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSlides.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all Slide successfully"
            state.Slides = action.payload
        })
        .addCase(getSlides.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        
        // create
        builder.addCase(createSlide.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createSlide.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "createGet all Slide successfully"
            state.createSlide = action.payload
        })
        .addCase(createSlide.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // get id 
        builder.addCase(getIdSlide.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getIdSlide.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get id Slide successfully"
            state.aSlide = action.payload
        })
        .addCase(getIdSlide.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // update 
        builder.addCase(updateSlide.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateSlide.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "update Slide successfully"
            state.updateName = action.payload?.udSlide
            state.isLoading = false
        })
        .addCase(updateSlide.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // delete 
        builder.addCase(deleteSlide.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteSlide.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "delete Slide successfully"
            state.deleteSlide = action.payload
            state.isLoading = false
        })
        .addCase(deleteSlide.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        .addCase(resetState, () => initialState);
    }
})

export default SlideSlice.reducer