import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import blogService from './blogService'


export const getBlogs = createAsyncThunk('blog/get-blog',async(thunkAPI)=>{
    try {
        return await blogService.getBlogs() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getIdBlog = createAsyncThunk('blog/get-id-blog',async(id,thunkAPI)=>{
    try {
        return await blogService.getIdBlog(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateBlog = createAsyncThunk('blog/update-blog',async(blogData,thunkAPI)=>{
    try {
        return await blogService.updateBlog(blogData) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createBlog = createAsyncThunk('blog/create-blog',async(blog,thunkAPI)=>{
    try {
        return await blogService.createBlog(blog) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteBlog = createAsyncThunk('blog/delete-blog',async(id,thunkAPI)=>{
    try {
        return await blogService.deleteBlog(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

const initialState = {
    blogs :[],
    createblog:"",
    blogId:"",
    updateName:"",
    deleteblog:{},
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const blogSlice = createSlice({
    name : "blog",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getBlogs.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBlogs.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all blog successfully"
            state.blogs = action.payload
        })
        .addCase(getBlogs.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        
        // create
        builder.addCase(createBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "createGet all blog successfully"
            state.createblog = action.payload
        })
        .addCase(createBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // get id 
        builder.addCase(getIdBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getIdBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get id blog successfully"
            state.blogId = action.payload
        })
        .addCase(getIdBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // update 
        builder.addCase(updateBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateBlog.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "update blog successfully"
            state.updateName = action.payload?.udblog
            state.isLoading = false
        })
        .addCase(updateBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // delete 
        builder.addCase(deleteBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteBlog.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "delete blog successfully"
            state.deleteblog = action.payload
            state.isLoading = false
        })
        .addCase(deleteBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        .addCase(resetState, () => initialState);
    }
})

export default blogSlice.reducer