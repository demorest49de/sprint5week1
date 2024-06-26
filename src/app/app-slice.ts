import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { authActions } from "features/Login/auth-slice"
import { authAPI } from "api/todolists-api"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      } else {
      }
    })
    .finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    })
}

export const appSlice = slice.reducer
export const appActions = slice.actions

export type InitialStateType = ReturnType<typeof slice.getInitialState>
