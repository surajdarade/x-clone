import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TweetState {
  tweets: Tweet[] | null;
  refresh: boolean;
  isActive: boolean;
}

export interface UserDetails {
  _id: string;
  name: string;
  username: string;
  email: string;
}

interface Tweet {
  id: string;
  _id: string;
  userId: string;
  description: string;
  like: string[];
  userDetails: UserDetails[];
}

const initialState: TweetState = {
  tweets: null,
  refresh: false,
  isActive: false,
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    getAllTweets: (state, action: PayloadAction<Tweet[]>) => {
      state.tweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

export const { getAllTweets, getRefresh, getIsActive } = tweetSlice.actions;

export default tweetSlice.reducer;
