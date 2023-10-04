/* eslint-disable no-undef */
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { Auth, Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import serverApi from "../apis/server";

const initialState = {
  isSignedIn: false,
  loading: false,
  error: false,
  errorMessage: "",
  "custom:images": "[]",
  "custom:tags": "[]",
  "custom:categories": "[]",
  "custom:mobility": true,
  "custom:experience": "",
  "custom:height": "0",
  "custom:age": "0",
  "cognito:groups": "[]",
  gender: "זכר",
  picture: "",
  phone_number: "",
  username: "",
};
const addToGroup = async (groupName, userSub) => {
  await serverApi.patch(`/addUserToGroup`, {
    group: groupName,
    username: userSub,
  });
};

const uploadImage = async (pathToImageFile) => {
  if (
    pathToImageFile &&
    (pathToImageFile.includes("file://") ||
      pathToImageFile.includes("assets-library://"))
  ) {
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
  }
  return pathToImageFile;
};

const uploadUserGallery = async (galleryArray) => {
  const gallery = [];

  for (let index = 0; index < galleryArray.length; index++) {
    const element = galleryArray[index];
    gallery.push(uploadImage(element));
  }

  return Promise.all(gallery);
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const cognitoUser = await Auth.signIn(user);
      return {
        ...cognitoUser.attributes,
        username: cognitoUser.username,
        "cognito:groups":
          cognitoUser.signInUserSession.idToken.payload["cognito:groups"],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const { userSub } = await Auth.signUp(user);
      await addToGroup(user.clientMetadata.group, userSub);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const tryToLogin = createAsyncThunk(
  "user/tryAutoLogin",
  async (thunkAPI) => {
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      return {
        ...user.attributes,
        username: user.username,
        "cognito:groups":
          user.signInUserSession.idToken.payload["cognito:groups"],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk("user/signOut", async (thunkAPI) => {
  try {
    return Auth.signOut();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUserAttributes = createAsyncThunk(
  "user/updateUserAttributes",
  async (values, thunkAPI) => {
    try {
      const loggedUser = thunkAPI.getState();
      const [user, picture, images] = await Promise.all([
        Auth.currentAuthenticatedUser({
          bypassCache: true,
        }),
        typeof values.picture === "undefined"
          ? loggedUser.user.picture
          : uploadImage(values.picture),
        typeof values["custom:images"] === "undefined"
          ? JSON.parse(loggedUser.user["custom:images"])
          : uploadUserGallery(values["custom:images"]),
      ]);

      await Auth.updateUserAttributes(user, {
        ...values,
        picture,
        "custom:images": JSON.stringify(images),
      });

      return {
        ...values,
        picture,
        "custom:images": JSON.stringify(images),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signOut.fulfilled, () => initialState);
    builder.addCase(registerUser.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: true,
      errorMessage: action.payload,
    }));
    builder.addCase(registerUser.fulfilled, (state, action) => ({
      ...state,
      loading: false,
    }));
    builder.addMatcher(
      isAnyOf(
        loginUser.pending,
        registerUser.pending,
        signOut.pending,
        updateUserAttributes.pending
      ),
      (state) => ({
        ...state,
        loading: true,
        errorMessage: "",
        error: false,
      })
    );
    builder.addMatcher(
      isAnyOf(
        loginUser.fulfilled,
        tryToLogin.fulfilled,
        updateUserAttributes.fulfilled
      ),
      (state, action) => ({
        ...state,
        ...action.payload,
        loading: false,
        error: false,
        errorMessage: "",
        isSignedIn: true,
      })
    );
    builder.addMatcher(
      isAnyOf(
        loginUser.rejected,
        signOut.rejected,
        updateUserAttributes.rejected
      ),
      (state) => ({
        ...state,
        loading: false,
        errorMessage: "",
        error: true,
      })
    );
  },
});

export default userSlice.reducer;

export const userSelector = (state) => state.user;
