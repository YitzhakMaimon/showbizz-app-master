import serverApi from "../../apis/server";

export default async (data, emailType) => {
  try {
    const response = await serverApi.post(`/sendMail`, {
      ...data,
      emailType,
    });
  } catch (error) {
    console.log(error.message);
  }
};
