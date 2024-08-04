import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AuthResponse {
  success: boolean;
  authToken?: string;
  error?: string;
}

export type User = {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
}

export type AuthState = {
  user: User | null;
  loading: boolean;
  error:string|null;
  loginError:string|null;
  SignUpError: string | null;
  isLoggedIn: boolean;
}

export type RegisterUserParams= {
  Name: string;
  Email: string;
  Password: string;
  ContactNumber: string;
  navigate: (path: string) => void;
}

export type LoginUserParams =Omit<RegisterUserParams,'Name' | 'ContactNumber'>


const initialState: AuthState = {
  user: null,
  loading: false,
  error:null,
  loginError: null,
  SignUpError: null,
  isLoggedIn: false,
};



export const getUserDetails = createAsyncThunk('auth/getUserDetails', async () => {
  try {
    const response = await fetch('https://singhagency-backened.onrender.com/SinghAgencies/getLogedInUserDetail', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken') || '', 
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error:any) {
    throw new Error(error.message || 'Error fetching user details.');
  }
});

export const registerUser = createAsyncThunk<AuthResponse, RegisterUserParams>('auth/registerUser', async ({ Name, Email, Password, ContactNumber, navigate }: RegisterUserParams) => {
  try {
    const response = await fetch('https://singhagency-backened.onrender.com/SinghAgencies/CreateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name, Email, Password, ContactNumber }),
    });
    const responseData = await response.json();

    if(responseData.success){
      localStorage.setItem('authToken', responseData.authToken);
      navigate('/');
    
    }
    return responseData;
  } catch (error:any) {
    throw new Error(error.message || 'Registration failed.');
  }
});


export const logInUser = createAsyncThunk<AuthResponse, LoginUserParams>('auth/logInUser', async ({ Email, Password, navigate }: LoginUserParams) => {
  try {
    const response = await fetch('https://singhagency-backened.onrender.com/SinghAgencies/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email, Password }),
    });

    const responseData = await response.json();

    if(responseData.success){
      localStorage.setItem('authToken', responseData.authToken);
      navigate('/');
    }
    return responseData;
  } catch (error:any) {
    throw new Error(error.message || 'Login failed.');
  }
});


const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        if ((action.payload as any).error) {
          state.error = 'Error fetching user details';
          return;
        }
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching user details.';
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.SignUpError = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        if (action.payload.error) {
          state.SignUpError = action.payload.error;
          return;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.SignUpError = action.error.message || 'Registration failed.';
      })

      .addCase(logInUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(logInUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        if (action.payload.error) {
          state.loginError = action.payload.error;
          return;
        }
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.error.message || 'Login failed.';
      });
  },
});

export const { setLoggedIn } = authSlice.actions;
export const authReducer = authSlice.reducer;