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
  email: string;
  avatar: string;
  bio: string;
  following: string[];
  followers: string[];
  bookmarks: string[];
  tweetCount: number;
}

export interface Profile {
  id: string;
  name: string;
  _id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  following: string[];
  followers: string[];
  bookmarks: string[];
  tweetCount: number;
}

export interface OtherUser {
  id: string;
  name: string;
  _id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  following: string[];
  followers: string[];
  bookmarks: string[];
  tweetCount: number;
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
    getUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action: PayloadAction<OtherUser[] | null>) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
    getFollowUnfollowUpdate: (state, action: PayloadAction<string | "">) => {
      if (state.user?.following.includes(action.payload)) {
        state.user.following = state.user?.following.filter((itemId) => {
          return itemId != action.payload;
        });
      } else {
        state.user?.following.push(action.payload);
      }
    },
    getBookmarks: (state, action: PayloadAction<string | "">) => {
      if (state.user?.bookmarks.includes(action.payload)) {
        state.user.bookmarks = state.user?.bookmarks.filter((itemId) => {
          return itemId != action.payload;
        });
      } else {
        state.user?.bookmarks.push(action.payload);
      }
    },
    userSliceReset: () => initialState,
  },
});

export const {
  getUser,
  getOtherUsers,
  getMyProfile,
  getFollowUnfollowUpdate,
  getBookmarks,
  userSliceReset,
} = userSlice.actions;

export default userSlice.reducer;
