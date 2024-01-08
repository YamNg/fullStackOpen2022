import axios from "axios";
import { INote } from "../reducers/noteReducer";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content: INote) => {
  const object = { content, important: false };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (id: string, content: any) => {
  const response = await axios.patch(`${baseUrl}/${id}`, content);
  return response.data;
};

export default { getAll, createNew, update };
