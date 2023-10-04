import serverApi from "../../apis/server";

export default async (username, values) => {
  try {
    await serverApi.post(`/notifyCandidateChosen`, {
      username,
      values,
    });
  } catch (error) {
    console.log(error.message);
  }
};
