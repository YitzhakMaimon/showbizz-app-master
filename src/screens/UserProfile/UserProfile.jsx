import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/userSlice";

import LoggedinRepresentedProfile from "../../components/LoggedinRepresentedProfile/LoggedinRepresentedProfile";
import LoggedinClientProfile from "../../components/LoggedinClientProfile/LoggedinClientProfile";

const UserProfile = ({ route, navigation }) => {
  const {
    "cognito:groups": [group],
  } = useSelector(userSelector);

  return group === "represented" ? (
    <LoggedinRepresentedProfile navigation={navigation} route={route} />
  ) : (
    <LoggedinClientProfile navigation={navigation} />
  );
};

export default UserProfile;
