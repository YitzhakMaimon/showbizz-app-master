/* eslint-disable no-undef */
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

import serverApi from "../apis/server";

const initialState = {
  posts: [],
  userPosts: [],
  loading: false,
  error: false,
};

const uploadImage = async (pathToImageFile) => {
  const response = await fetch(pathToImageFile);
  const blob = await response.blob();
  const fileName = uuidv4();
  await Storage.put(fileName, blob, {
    contentType: blob._data.type,
    ACL: "public-read",
    visibility: "public",
    level: "public",
  });

  await new Promise((resolve) => setTimeout(resolve, 8000));

  return fileName;
};

const uploadUserGallery = async (galleryArray) => {
  const gallery = [];

  for (let index = 0; index < galleryArray.length; index++) {
    const element = galleryArray[index];
    gallery.push(uploadImage(element));
  }

  return Promise.all(gallery);
};

//TODO: add post to posts list
//TODO: add store for user posts
export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      let images = [""];
      if (Array.isArray(postData?.images)) {
        images = await uploadUserGallery(postData.images);
      }

      await serverApi.post(`/createPost`, {
        ...postData,
        images,
      });
      return postData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPosts = createAsyncThunk("posts/fetch", async (thunkAPI) => {
  try {
    const response = await serverApi.get(`/getAllPosts`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (ownerId, thunkAPI) => {
    try {
      const response = await serverApi.get(`/getUserPosts?ownerId=${ownerId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCandidateToPost = createAsyncThunk(
  "posts/addCandidate",
  async ({ username, postId }, thunkAPI) => {
    try {
      await serverApi.patch(`/addCandidateToPost`, {
        postId,
        newUsername: username,
      });
      return { username, postId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeCandidateFromPost = createAsyncThunk(
  "posts/removeCandidate",
  async ({ username, postId }, thunkAPI) => {
    try {
      await serverApi.patch(`/removeCandidateFromPost`, {
        postId,
        username,
      });
      return { username, postId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
    }));
    builder.addCase(addCandidateToPost.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: true,
    }));
    builder.addCase(addCandidateToPost.fulfilled, (state, action) => ({
      ...state,
      posts: state.posts.map((x) =>
        x.postId !== action.payload.postId
          ? x
          : {
              ...x,
              candidates: [
                ...(typeof x.candidates !== "undefined" ? x.candidates : []),
                action.payload.username,
              ],
            }
      ),
      loading: false,
      error: false,
    }));
    builder.addCase(removeCandidateFromPost.fulfilled, (state, action) => ({
      ...state,
      posts: state.posts.map((x) =>
        x.postId !== action.payload.postId
          ? x
          : {
              ...x,
              candidates: x.candidates.filter(
                (y) => y !== action.payload.username
              ),
              chosenCandidates: x.chosenCandidates.filter(
                (y) => y !== action.payload.username
              ),
            }
      ),
      loading: false,
      error: false,
    }));
    builder.addCase(fetchPosts.fulfilled, (state, action) => ({
      ...state,
      posts: action.payload,
      loading: false,
      error: false,
    }));
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => ({
      ...state,
      userPosts: action.payload,
      loading: false,
      error: false,
    }));
    builder.addCase(fetchPosts.rejected, (state) => ({
      ...state,
      loading: false,
      error: true,
    }));
    builder.addMatcher(
      isAnyOf(
        addCandidateToPost.pending,
        removeCandidateFromPost.pending,
        createPost.pending
      ),
      (state) => ({
        ...state,
        loading: true,
        error: false,
      })
    );
  },
});

export default postsSlice.reducer;

export const postsSelector = (state) => state.posts;
