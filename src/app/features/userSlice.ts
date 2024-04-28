import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { CancelTokenSource } from "axios";
import { baseUrl, imageUrl } from "../../services/config";

let cancelSource: CancelTokenSource | undefined;

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (pageInfo: string, { signal, rejectWithValue }) => {
    if (cancelSource) {
      cancelSource.cancel("Switching tabs");
    }
    cancelSource = axios.CancelToken.source();
    try {
      const result = await axios.get(`${baseUrl}/pokemon?${pageInfo}`, {
        cancelToken: cancelSource.token,
        signal,
      });
      return result.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return rejectWithValue("Request canceled");
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const cancelGetUsers = () => {
  if (cancelSource) {
    cancelSource.cancel("Switching tabs");
  }
};

export const getUserTypes = createAsyncThunk("user/getUserTypes", async () => {
  try {
    const response = await axios.get(`${baseUrl}/type`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const getListBasedType = createAsyncThunk(
  "user/getListBasedType",
  async (type: string, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/type/${type}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export interface userStateType {
  usersListData: {
    count?: number;
    next?: string;
    previous?: string;
    results?: {
      id: number;
      name: string;
      url: string;
      imagePath: string;
    }[];
  };

  filteredUsersListData: {
    count?: number;
    next?: string;
    previous?: string;
    results?: {
      id: number;
      name: string;
      url: string;
      imagePath: string;
    }[];
  };
  isUserLoading: boolean;
  usersTypes: {
    count?: number;
    results?: {
      name: string;
      url: string;
    }[];
  };
  pageLimit: number;
  currentPage: number;
}

const initialUserState: userStateType = {
  usersListData: {},
  filteredUsersListData: {},
  usersTypes: {},
  pageLimit: 10,
  currentPage: 0,
  isUserLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateFilteredUser: (state, action) => {
      state.filteredUsersListData = {
        ...state.usersListData,
        results: action.payload,
      };
    },
    updatePageLimit: (state, action) => {
      state.pageLimit = action.payload;
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<userStateType["usersListData"]>) => {
          const { payload } = action;
          let pokemonList = payload.results?.map((pokemon, index) => {
            return {
              ...pokemon,
              imagePath: `${imageUrl}/${pokemon.url
                ?.split("/")
                ?.filter(Boolean)
                ?.pop()}.png`,
              id: index,
            };
          });
          state.usersListData = {
            next: payload.next?.split("?")[1],
            previous: payload.previous?.split("?")[1],
            count: payload.count,
            results: pokemonList,
          };
          state.filteredUsersListData = {
            next: payload.next?.split("?")[1],
            previous: payload.previous?.split("?")[1],
            count: payload.count,
            results: pokemonList,
          };
          state.isUserLoading = false;
        }
      )
      .addCase(getUsers.rejected, (state) => {
        state.isUserLoading = false;
      });
    builder.addCase(
      getUserTypes.fulfilled,
      (state, action: PayloadAction<userStateType["usersTypes"]>) => {
        const { payload } = action;
        state.usersTypes = {
          count: payload.count,
          results: payload.results,
        };
      }
    );

    builder.addCase(getListBasedType.fulfilled, (state, action) => {
      const { payload } = action;
      const typePokemonList = payload?.pokemon?.flatMap(
        ({ pokemon }: { pokemon: { name: string; url: string } }) => {
          return {
            ...pokemon,
            imagePath: `${imageUrl}/${pokemon?.url
              ?.split("/")
              ?.filter(Boolean)
              ?.pop()}.png`,
            id: pokemon?.url?.split("/")?.filter(Boolean)?.pop(),
          };
        }
      );

      state.usersListData = {
        next: "",
        previous: "",
        count: 0,
        results: typePokemonList,
      };
      state.filteredUsersListData = {
        next: "",
        previous: "",
        count: 0,
        results: typePokemonList,
      };
    });
  },
});

export const { updateFilteredUser, updatePageLimit, updateCurrentPage } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
