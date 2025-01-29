import React, { useEffect, useState } from "react";
import { Box, FormControl } from "@mui/material";
import TableList from "../components/TableList.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from "../components/CustomButton.js";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import Input from "../components/Input.js";
import TopHeaderTitle from "../components/TopHeaderTitle.js";
import { get, create } from "../util/fetchUtils.js";
import {
  TRANSACTION_CREATE_URL,
  YELAM_GET_ALL_URL,
} from "../util/constants.js";
import { YelamEditFormFields } from "../assets/Data.js";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/CustomSelect.js";
import {
  PAYMENT_FAILURE_ALERT_MESSAGE,
  PAYMENT_SUCCESS_ALERT_MESSAGE,
} from "../util/alerts.js";
import { YelamListFields } from "../assets/Fields.js";

function YelamList() {
  const initialValues = {
    yelam: null,
    amount: "",
    receipt_number: "",
    payment_mode: "",
  };
  const [openEditModal, setOpenEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const [paymentTransactionPayload, setPaymentTransactionPayload] =
    useState(initialValues);

  useEffect(() => {
    fetchYelam();
  }, []);

  const fetchYelam = async () => {
    try {
      const res = await get(YELAM_GET_ALL_URL());
      setData(res.data);
      setLoading(true);
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = async (id) => {
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setCurrentRow(null);
    setPaymentTransactionPayload(initialValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const pendingAmount = parseFloat(
        paymentTransactionPayload.pending_amount || 0
      );
      if (parseFloat(value) > pendingAmount) {
        // Set custom error message
        e.target.setCustomValidity(
          "Paying Amount cannot exceed Pending Amount"
        );
      } else {
        // Clear any previous error
        e.target.setCustomValidity("");
      }
    }
    setPaymentTransactionPayload((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name) => (value) => {
    setPaymentTransactionPayload((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const openPaymentStatusModal = (row) => {
    setCurrentRow(row);
    setOpenEditModal(true);
  };

  const handleUpdatePayment = async () => {
    paymentTransactionPayload["yelam"] = currentRow.id;
    try {
      const res = await create(
        TRANSACTION_CREATE_URL(),
        paymentTransactionPayload
      );
      if (res.status === 201) {
        setLoading(false);
        setOpenEditModal(false);
        setSuccessAlert(true);
        setAlertMessage(PAYMENT_SUCCESS_ALERT_MESSAGE);
        setTimeout(() => setSuccessAlert(false), 5000);
        navigate("/yelam-list");
        return true;
      }
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setAlertMessage(PAYMENT_FAILURE_ALERT_MESSAGE);
      setTimeout(() => setErrorAlert(false), 5000);
      return false;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px",
        flexDirection: "column",
        overflow: "hidden",
        maxWidth: "100%",
      }}
    >
      <TopHeaderTitle pagename={"YELAM LIST"} />
      {loading && <Loader />}

      {/* Alerts */}
      {loading && <Loader />}
      <CustomAlert openAlert={successAlert} message={alertMessage} />

      <CustomAlert openAlert={errorAlert} message={alertMessage} />

      <TableList
        openEdit={openEdit}
        fields={YelamListFields}
        data={data}
        showPaymentStatus={true} // Show "Payment Status" button
        handlePaymentStatus={(row) => openPaymentStatusModal(row)} // Add handler
      />

      {/* Edit Dialog */}
      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <form onSubmit={handleUpdatePayment}>
          <Box sx={{ width: "500px" }}>
            <DialogTitle fontWeight={600}>Edit Payment Details</DialogTitle>
            <DialogContent>
              {YelamEditFormFields.map((field) => (
                <Box key={field.name}>
                  {field.type === "dropdown" ? (
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <CustomSelect
                        value={paymentTransactionPayload[field.name]}
                        onChange={(newValue) =>
                          handleDropdownChange(field.name)(newValue)
                        }
                        name={field.name}
                        fields={field.options}
                        label={field.label}
                      />
                    </FormControl>
                  ) : (
                    <Input
                      label={field.label}
                      name={field.name}
                      value={
                        currentRow && currentRow.hasOwnProperty(field.name)
                          ? currentRow[field.name]
                          : paymentTransactionPayload[field.name]
                      }
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      required={field.required}
                      type={field.type || "text"}
                      readonly={field.readonly}
                      onInvalid={(e) => {
                        if (field.name === "amount") {
                          const pendingAmount = parseFloat(
                            paymentTransactionPayload.pending_amount || 0
                          );
                          if (parseFloat(e.target.value) > pendingAmount) {
                            e.target.setCustomValidity(
                              "Paying Amount cannot exceed Pending Amount"
                            );
                          } else {
                            e.target.setCustomValidity(""); // Clear error if valid
                          }
                        }
                      }}
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  )}
                </Box>
              ))}
            </DialogContent>
            <DialogActions>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <CustomButton
                  inverted={true}
                  label="Cancel"
                  onclick={handleCloseModal}
                />
                <CustomButton
                  inverted={false}
                  label="Update Payment"
                  type="submit"
                />
              </Box>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
    </Box>
  );
}

export default YelamList;
