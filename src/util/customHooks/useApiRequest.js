import { useState } from "react";
import { create, get, update } from "../fetchUtils";

export const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchData = async (url, successmessage, failuremessage) => {
    setLoading(true);
    try {
      const res = await get(url);
      return res.data;
    } catch (error) {
      setErrorAlert(true);
      setAlertMessage(failuremessage);
      setTimeout(() => setErrorAlert(false), 5000);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const postData = async (
    url,
    formData,
    successmessage,
    failuremessage,
    navigateTo
  ) => {
    setLoading(true);
    try {
      const res = await create(url, formData);
      if (res.status === 201) {
        setSuccessAlert(true);
        setAlertMessage(successmessage);
        setTimeout(() => setSuccessAlert(false), 5000);
        if (navigateTo) navigateTo();
        return res.data; // Return the response data
      }
    } catch (error) {
      setErrorAlert(true);
      setAlertMessage(failuremessage);
      setTimeout(() => setErrorAlert(false), 5000);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const updateData = async (url, data, successmessage, failuremessage) => {
    setLoading(true);
    try {
      const res = await update(url, data);
      if (res.status === 200) {
        setSuccessAlert(true);
        setAlertMessage(successmessage);
        setTimeout(() => setSuccessAlert(false), 5000);
        return true;
      }
    } catch (error) {
      setErrorAlert(true);
      setAlertMessage(failuremessage);
      setTimeout(() => setErrorAlert(false), 5000);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errorAlert,
    successAlert,
    alertMessage,
    fetchData,
    postData,
    updateData,
  };
};
