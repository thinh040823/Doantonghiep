import {
  createSlice,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";
const getTokenFromLocalStorage =
  sessionStorage.getItem("user")
    ? JSON.parse(
        sessionStorage.getItem("user")
      )
    : null;

export const register =
  createAsyncThunk(
    "auth/register",
    async (userData, thunkApi) => {
      try {
        return await authService.registerUser(
          userData
        );
      } catch (error) {
        return thunkApi.rejectWithValue(
          error
        );
      }
    }
  );

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      return await authService.loginUser(
        userData
      );
    } catch (error) {
      return thunkApi.rejectWithValue(
        error
      );
    }
  }
);
export const getUser = createAsyncThunk(
  "auth/get-user",
  async (id, thunkApi) => {
    try {
      return await authService.getUser(
        id
      );
    } catch (error) {
      return thunkApi.rejectWithValue(
        error
      );
    }
  }
);

export const cart = createAsyncThunk(
  "auth/add-cart",
  async (cartData, thunkApi) => {
    try {
      return await authService.addToCart(
        cartData
      );
    } catch (error) {
      return thunkApi.rejectWithValue(
        error
      );
    }
  }
);

export const getCart = createAsyncThunk(
  "auth/get-cart",
  async (thunkApi) => {
    try {
      return await authService.getCart();
    } catch (error) {
      return thunkApi.rejectWithValue(
        error
      );
    }
  }
);
export const deletePrCart =
  createAsyncThunk(
    "auth/delete-cart",
    async (cartItemId, thunkApi) => {
      try {
        return await authService.removeProductCart(
          cartItemId
        );
      } catch (error) {
        return thunkApi.rejectWithValue(
          error
        );
      }
    }
  );

export const updateQuantity =
  createAsyncThunk(
    "auth/update-cart",
    async (cartDetail, thunkApi) => {
      try {
        return await authService.updateProductCart(
          cartDetail
        );
      } catch (error) {
        return thunkApi.rejectWithValue(
          error
        );
      }
    }
  );

export const emptycart =
  createAsyncThunk(
    "auth/empth-cart",
    async (thunkApi) => {
      try {
        return await authService.empty();
      } catch (error) {
        return thunkApi.rejectWithValue(
          error
        );
      }
    }
  );
export const updateUser =
  createAsyncThunk(
    "auth/update-user",
    async (data, thunkAPI) => {
      try {
        return await authService.updateUser(
          data
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error
        );
      }
    }
  );
export const updatePass =
  createAsyncThunk(
    "auth/update-pass",
    async (data, thunkAPI) => {
      try {
        return await authService.updatePass(
          data
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error
        );
      }
    }
  );
export const getMyorder =
  createAsyncThunk(
    "auth/get-order",
    async (cartData, thunkApi) => {
      try {
        return await authService.getOrder();
      } catch (error) {
        return thunkApi.rejectWithValue(
          error
        );
      }
    }
  );
export const EmailOTP =
  createAsyncThunk(
    "buyer/send-otp",
    async (email, thunkApi) => {
      try {
        return await authService.SendEmailOTP(
          email
        );
      } catch (error) {
        return thunkApi.rejectWithValue(
          error
        );
      }
    }
  );
export const resetState = createAction(
  "Reset_all"
);

const initialState = {
  user: getTokenFromLocalStorage,
  loginUser: "",
  OTP: "",
  regis: "",
  ToCart: "",
  updateUser: "",
  myOrder: "",
  cartUser: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        EmailOTP.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        EmailOTP.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.OTP = action.payload;
          if (
            state.isSuccess === true
          ) {
            toast.success(
              "Mã OTP đã được gửi, vui lòng kiểm tra."
            );
          }
        }
      )
      .addCase(
        EmailOTP.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        }
      );

    builder
      .addCase(
        register.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        register.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.regis = action.payload;
          if (
            state.isSuccess === true
          ) {
            toast.info(
              "Đăng ký thành công"
            );
          }
        }
      )
      .addCase(
        register.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if (state.isError === true) {
            toast.error(
              "Đăng ký thất bại"
            );
          }
        }
      );

    builder
      .addCase(
        login.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        login.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.user = action.payload;
          if (
            state.isSuccess === true
          ) {
            sessionStorage.setItem(
              "user",
              JSON.stringify(
                action.payload
              )
            );
            sessionStorage.setItem(
              "token",
              JSON.stringify(
                action.payload.token
              )
            );
            window.location.reload();
          }
        }
      )
      .addCase(
        login.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if (state.isError === true) {
            toast.error(
              "Đăng nhập thất bại"
            );
          }
        }
      );

    builder
      .addCase(
        cart.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        cart.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.ToCart = action.payload;
          if (state.isSuccess) {
            toast.success(
              "Đã thêm vào giỏ hàng"
            );
          }
        }
      )
      .addCase(
        cart.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        }
      );

    builder
      .addCase(
        getCart.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        getCart.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.cartUser =
            action.payload;
        }
      )
      .addCase(
        getCart.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        }
      );
    builder
      .addCase(
        deletePrCart.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        deletePrCart.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.delCart =
            action.payload;
        }
      )
      .addCase(
        deletePrCart.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if (state.isError === true) {
            toast.error(
              "Something went wrong !"
            );
          }
        }
      );
    builder
      .addCase(
        updateQuantity.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        updateQuantity.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.udCart = action.payload;
        }
      )
      .addCase(
        updateQuantity.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        }
      );

    builder
      .addCase(
        updateUser.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        updateUser.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          state.message =
            "update user success";
        }
      )
      .addCase(
        updateUser.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.user = null;
          state.message = "rejected";
        }
      );

    builder
      .addCase(
        updatePass.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        updatePass.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user.password =
            action.payload;
          state.message =
            "update user success";
          if (
            state.isSuccess === true
          ) {
            toast.success(
              "Cập nhật mật khẩu thành công"
            );
          }
        }
      )
      .addCase(
        updatePass.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.user.password = null;
          state.message = "rejected";
          if (state.isError === true) {
            toast.error(
              "Cập nhật mật khẩu thất bại!"
            );
          }
        }
      );

    builder
      .addCase(
        emptycart.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        emptycart.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.empt = action.payload;
        }
      )
      .addCase(
        emptycart.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        }
      );
    builder
      .addCase(
        getMyorder.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        getMyorder.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.myOrder =
            action.payload;
        }
      )
      .addCase(
        getMyorder.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        }
      )
      .addCase(
        resetState,
        () => initialState
      );
  },
});

export default authSlice.reducer;
