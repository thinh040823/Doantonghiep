import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import categoryBlogService from './categoryBlogService'


export const getCategoryBlog = createAsyncThunk('categoryBlog/get-categoryBlog',async(thunkAPI)=>{
    try {
        return await categoryBlogService.getPcategoryBlog()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createCategoryBlog = createAsyncThunk('categoryBlog/create-categoryBlog',async(category,thunkAPI)=>{
    try {
        return await categoryBlogService.createCategoryBlog(category) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getIdCategoryBlog = createAsyncThunk('categoryBlog/get-id-categoryBlog',async(id,thunkAPI)=>{
    try {
        return await categoryBlogService.getIdCategoryBlog(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCategoryBlog = createAsyncThunk('categoryBlog/update-categoryBlog',async(categoryData,thunkAPI)=>{
    console.log(categoryData)
    try {
        return await categoryBlogService.updateCategoryBlog(categoryData) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCategoryBlog = createAsyncThunk('categoryBlog/delete-categoryBlog',async(id,thunkAPI)=>{
    try {
        return await categoryBlogService.deleteCategoryBlog(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

const initialState = {
    categoryBlog :[],
    create:"",
    categoryBlogName:"",
    updateBlogName:"",
    deleteCategoryBlog:{},
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const pcategorySlice = createSlice({
    name : "categoryBlog",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getCategoryBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCategoryBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all category successfully"
            state.categoryBlog = action.payload
        })
        .addCase(getCategoryBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        builder.addCase(createCategoryBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createCategoryBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "create category category successfully"
            state.create = action.payload
        })
        .addCase(createCategoryBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // get id 
        builder.addCase(getIdCategoryBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getIdCategoryBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get id category successfully"
            state.categoryBlogName = action.payload?.getCategory?.title
        })
        .addCase(getIdCategoryBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // update 
        builder.addCase(updateCategoryBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateCategoryBlog.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "update category successfully"
            state.updateBlogName = action.payload?.udBrand
            state.isLoading = false
        })
        .addCase(updateCategoryBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // delete 
        builder.addCase(deleteCategoryBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteCategoryBlog.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "delete category successfully"
            state.deleteCategoryBlog = action.payload
            state.isLoading = false
        })
        .addCase(deleteCategoryBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState);
        
    }
})

export default pcategorySlice.reducer