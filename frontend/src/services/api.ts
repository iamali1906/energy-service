import axios from "axios";
const API_URL = "http://localhost:8080";

export const saveData = async (body: any) => {
  try {
    const res = await axios.put(`${API_URL}/energy`, body);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getData = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/energy/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
