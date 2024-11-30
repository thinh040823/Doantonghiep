import { createSlice ,createAsyncThunk,createAction} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authService from './authService'
// Khởi tạo giá trị ban đầu của user:
// Nếu giá trị tồn tại (khác null hoặc undefined), thì JSON.parse được sử dụng để chuyển đổi chuỗi JSON thành đối tượng JavaScript
const getUserFromsessionStorage = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
// Khởi tạo trạng thái ban đầu cho Redux store:
const initialState = {
    user:getUserFromsessionStorage,
    orders:[],
    updateOrder:"",
    getAllUser:[],
    getUser:"",
    deletUser:"",
    updateUser:"",
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

//Định nghĩa action login bằng createAsyncThunk:
export const login = createAsyncThunk('auth/admin-login',async(user,thunkAPI)=>{
    try {
        return await authService.login(user) // gọi tới login trong authservice
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const register = createAsyncThunk('auth/register',async(user,thunkAPI)=>{
    try {
        return await authService.register(user) // gọi tới login trong authservice
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrder = createAsyncThunk('order/get-orders',async(thunkAPI)=>{
    try {
        return await authService.getOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrderById = createAsyncThunk('order/get-order',async(id,thunkAPI)=>{
    try {
        return await authService.getOrderById(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getAllOrder = createAsyncThunk('auth/all-order',async(thunkAPI)=>{
    try {
        return await authService.getAllOrder() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
// login admin
export const updateUser = createAsyncThunk('auth/update-user',async(data,thunkAPI)=>{
    try {
        return await authService.updateUser(data) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAllUser = createAsyncThunk('auth/get-all-user',async(thunkAPI)=>{
    try {
        return await authService.getAllUser() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUser = createAsyncThunk('auth/get-user',async(id,thunkAPI)=>{
    try {
        return await authService.getUser(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteUser = createAsyncThunk('auth/delete-user',async(id,thunkAPI)=>{
    try {
        return await authService.deleteUser(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateOrder = createAsyncThunk('auth/update-orderlist',async(data,thunkAPI)=>{
    try {
        return await authService.updateStatusOrder(data) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");



/**
 *  Tạo slice của Redux store bằng createSlice:
 *      login.pending: Action được kích hoạt khi thao tác đăng nhập bắt đầu.
        login.fulfilled: Action được kích hoạt khi thao tác đăng nhập thành công.
        login.rejected: Action được kích hoạt khi thao tác đăng nhập bị từ chối hoặc gặp lỗi.
 */
export const authSlice = createSlice({
    name:"auth", 
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user= action.payload
            state.message = "Login success"
            if(state.isSuccess){
                toast.success("Đăng nhập thành công 😁")
            }
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.user= null
            state.message = "Rejected"
        })

        builder.addCase(register.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.regiter= action.payload
            state.message = "Đăng ký thành công"
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.regiter= null
            state.message = "Rejected"
        })

        builder.addCase(getAllOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.orders= action.payload
            state.message = "getAllOrder success"
        })
        .addCase(getAllOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.orders= null
            state.message = "Rejected"
        })
        // order action
        .addCase(getOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.orders= action.payload
            state.message = "get Order success"
        })
        .addCase(getOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.orders= null
            state.message = "Rejected"
        })


        // order action
        .addCase(getOrderById.pending, (state) => {
            state.isLoading = true;
        })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderbyuser = action.payload;
        state.message = "success";
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
      //PUT
        // update user
        builder.addCase(updateUser.pending,(state)=> {
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.updateUser=action.payload
            state.message="update user success"
        })
        .addCase(updateUser.rejected,(state, action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.updateUser=null
            state.message="rejected"
        })


        //GET
        // get all users
        builder.addCase(getAllUser.pending,(state)=> {
            state.isLoading = true
        })
        .addCase(getAllUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.getAllUser=action.payload
            state.message="get all users success"
        })
        .addCase(getAllUser.rejected,(state, action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.getAllUser=null
            state.message="rejected"
        })

        builder.addCase(getUser.pending,(state)=> {
            state.isLoading = true
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.getUser=action.payload
            state.message="get users success"
        })
        .addCase(getUser.rejected,(state, action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.getUser=null
            state.message="rejected"
        })


        //DELETE
        // delete user
        builder.addCase(deleteUser.pending,(state)=> {
            state.isLoading = true
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.deletUser=action.payload
            state.message="delete user success"
        })
        .addCase(deleteUser.rejected,(state, action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.deletUser=null
            state.message="rejected"
        })


        builder.addCase(updateOrder.pending,(state)=> {
            state.isLoading = true
        })
        .addCase(updateOrder.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.updateOrder=action.payload
            state.message="update order user success"
        })
        .addCase(updateOrder.rejected,(state, action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.updateOrder=null
            state.message="rejected"
        })
        .addCase(resetState, () => initialState);
        
    }
})

export default authSlice.reducer