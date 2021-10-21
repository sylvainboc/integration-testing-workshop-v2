import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchCatRequestAPI } from './catAPI'

export type catType = {
    breeds: any
    id: string
    url: string
    width: number
    height: number
}
export interface CatState {
    cat: catType | undefined
    adoptedCats: catType[]
    status: 'idle' | 'loaded' | 'loading' | 'error'
}

const initialState: CatState = {
    cat: undefined,
    adoptedCats: [],
    status: 'idle',
}

export const fetchCat = createAsyncThunk(
    'cat/fetchCat',
    async () => await fetchCatRequestAPI()
)

export const catSlice = createSlice({
    name: 'cat',
    initialState,
    reducers: {
        fetchCatRequest: (state) => ({ ...state, status: 'loading' }),
        fetchCatSuccess: (state, action: PayloadAction<catType>) => ({
            ...state,
            status: 'loaded',
            cat: action.payload,
        }),
        fetchCatError: (state) => ({ ...state, status: 'error' }),
        adoptCat: (state) => {
            if (state.cat) {
                return {
                    ...state,
                    status: 'idle',
                    adoptedCats: [...state.adoptedCats, state.cat],
                }
            }
        },
    },
})

export const { fetchCatRequest, fetchCatSuccess, fetchCatError, adoptCat } =
    catSlice.actions

export default catSlice.reducer
