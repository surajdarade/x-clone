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
  avatar: string;
}

interface Tweet {
  id: string;
  _id: string;
  userId: string;
  description: string;
  like: string[];
  postImage: string;
  userDetails: UserDetails[];
  createdAt: string;
}

const initialState: TweetState = {
  tweets: null,
  refresh: false,
  isActive: true,
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    getAllTweets: (state, action: PayloadAction<Tweet[] | null>) => {
      state.tweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    
    tweetSliceReset: () => initialState,
  },
});

export const { getAllTweets, getRefresh, getIsActive, tweetSliceReset } = tweetSlice.actions;

export default tweetSlice.reducer;
