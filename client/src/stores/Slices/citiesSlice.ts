
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export interface City {
  id: number;
  name: string;
}

interface CityState {
  cities: City[];
  loading: boolean;
  error: string | null;
  loaded: boolean; // כדי לדעת אם כבר טענו פעם
}

const initialState: CityState = {
  cities: [],
  loading: false,
  error: null,
  loaded: false,
};

// thunk שמבצע קריאה חד־פעמית
export const fetchCities = createAsyncThunk<City[]>(
  'cities/fetchCities',
  async (_, thunkAPI) => {
    try {
      const token = cookies.get('token');
      const response = await fetch('http://localhost:7002/api/cities', {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('שגיאה בשליפת ערים');
      }

      const data = await response.json();
      return data; // ודא שזו מערך של ערים בלבד
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
        state.loaded = true;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectCities = (state: RootState) => state.cities.cities;
export const selectCitiesLoaded = (state: RootState) => state.cities.loaded;
export const selectCitiesLoading = (state: RootState) => state.cities.loading;
export const selectCitiesError = (state: RootState) => state.cities.error;

export default citySlice.reducer;
