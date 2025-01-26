import api from "./api";

export const get = async (url) => {
  try {
    const response = await api.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};
export const create = async (url, formData) => {
  try {
    const response = await api.post(url, formData);
    return response;
  } catch (error) {
    throw error;
  }
};
export const update = async (url, formData) => {
  try {
    const response = await api.patch(url, formData);
    return response;
  } catch (error) {
    throw error;
  }
};
