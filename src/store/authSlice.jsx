import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged , updateProfile} from "firebase/auth";
import { auth } from '../firebase.config';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, displayName }, { rejectWithValue }) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;
            await updateProfile(user,{displayName})
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const user = response.user;
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        await signOut(auth);
    }
);

export const checkAuthState = createAsyncThunk(
    'auth/checkAuthState',
    async (_, { rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                if (user) {
                    resolve({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName
                    });
                } else {
                    resolve(null);
                }
            }, (error) => reject(rejectWithValue(error.message)));
        });
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.status = 'idle';
                state.error = null;
            })
            .addCase(checkAuthState.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(checkAuthState.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            });
    },
});

export default authSlice.reducer;
