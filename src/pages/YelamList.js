import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TableList from "../components/TableList";
import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import Input from "../components/Input";
import TopHeaderTitle from "../components/TopHeaderTitle";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/CustomSelect";
import { YelamEditFormFields } from "../assets/Data";
import { YelamListFields } from "../assets/Fields";
import { TRANSACTION_CREATE_URL, YELAM_GET_ALL_URL } from "../util/constants";
import {
  PAYMENT_FAILURE_ALERT_MESSAGE,
  PAYMENT_SUCCESS_ALERT_MESSAGE,
} from "../util/alerts";
import { useApiRequest } from "../util/customHooks/useApiRequest";

function YelamList() {
  const navigate = useNavigate();
  const initialValues = {
    yelam: null,
    amount: "",
    receipt_number: "",
    payment_mode: "",
  };
  const {
    loading,
    errorAlert,
    successAlert,
    alertMessage,
    fetchData,
    postData,
  } = useApiRequest();

  const [data, setData] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [paymentTransactionPayload, setPaymentTransactionPayload] =
    useState(initialValues);

  useEffect(() => {
    fetchYelam();
  }, []);

  const fetchYelam = async () => {
    const res = await fetchData(YELAM_GET_ALL_URL());
    if (res) setData(res);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "amount" &&
      parseFloat(value) > parseFloat(currentRow.pending_amount || 0)
    ) {
      e.target.setCustomValidity("Paying Amount cannot exceed Pending Amount");
    } else {
      e.target.setCustomValidity("");
    }
    setPaymentTransactionPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name) => (value) => {
    setPaymentTransactionPayload((prev) => ({ ...prev, [name]: value }));
  };

  const openPaymentStatusModal = (row) => {
    setCurrentRow(row);
    setOpenEditModal(true);
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    paymentTransactionPayload.yelam = currentRow.id;
    const res = await postData(
      TRANSACTION_CREATE_URL(),
      paymentTransactionPayload,
      PAYMENT_SUCCESS_ALERT_MESSAGE,
      PAYMENT_FAILURE_ALERT_MESSAGE,
      () => navigate("/yelam-list")
    );
    if (res) {
      setOpenEditModal(false);
      setPaymentTransactionPayload(initialValues);
      fetchYelam();
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
      <TopHeaderTitle pagename="YELAM LIST" />
      {loading && <Loader />}
      <CustomAlert openAlert={successAlert} message={alertMessage} />
      <CustomAlert openAlert={errorAlert} message={alertMessage} />

      <TableList
        fields={YelamListFields}
        data={data}
        showPaymentStatus={true}
        handlePaymentStatus={openPaymentStatusModal}
      />

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
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
                        onChange={handleDropdownChange(field.name)}
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
                        currentRow?.[field.name] ||
                        paymentTransactionPayload[field.name]
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
                            currentRow?.pending_amount || 0
                          );
                          e.target.setCustomValidity(
                            parseFloat(e.target.value) > pendingAmount
                              ? "Paying Amount cannot exceed Pending Amount"
                              : ""
                          );
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
                  inverted
                  label="Cancel"
                  onclick={() => setOpenEditModal(false)}
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
