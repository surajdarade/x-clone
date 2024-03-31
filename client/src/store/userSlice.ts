import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: User | null;
  otherUsers: User[] | null;
  profile: User | null;
}

export interface User {
  id: string;
  name: string;
  _id: string;
  username: string;
}

export interface Profile {
  id: string;
  name: string;
  _id: string;
  username: string;
}

export interface OtherUser {
  id: string;
  name: string;
  _id: string;
  username: string;
}

const initialState: UserState = {
  user: null,
  otherUsers: null,
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action: PayloadAction<OtherUser[]>) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});

export const { getUser, getOtherUsers, getMyProfile } = userSlice.actions;

export default userSlice.reducer;
