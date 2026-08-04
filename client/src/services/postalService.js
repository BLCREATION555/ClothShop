import axios from "axios";

export const getLocationByPincode = async (pincode) => {
  const { data } = await axios.get(
    `https://api.postalpincode.in/pincode/${pincode}`
  );

  console.log(data);

  return data;
};