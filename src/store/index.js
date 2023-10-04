import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";
import starOfTheMonthReducer from "./starOfTheMonthSlice";
import representedReducer from "./representedSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    starOfTheMonth: starOfTheMonthReducer,
    represented: representedReducer,
  },
});
