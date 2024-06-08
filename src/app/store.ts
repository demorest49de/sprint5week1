import { tasksSlice } from "features/TodolistsList/tasks-slice"
import { todolistsSlice } from "features/TodolistsList/todolists-slice"
import { configureStore } from "@reduxjs/toolkit"
import { appSlice } from "app/app-slice"
import { authReducer } from "features/Login/auth-reducer"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
