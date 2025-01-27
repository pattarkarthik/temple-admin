import React, { useState } from "react";
import RadioButton from "../components/RadioButton";
import { Box, Grid, Paper } from "@mui/material";
import TopHeaderTitle from "../components/TopHeaderTitle";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";
import { create, get } from "../util/fetchUtils";
import { NEW_MEMBER_GET_URL, YELAM_CREATE_URL } from "../util/constants";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";

const inhousePreFetchFields = [
  { label: "Enter Pulli ID", name: "pulli_id", required: true },
];
const externalPreFetchFields = [
  { label: "புல்லி ஐடி", name: "pulli_id", required: true },
  { label: "விருந்தினர் பெயர்", name: "guest_name", required: true },
  {
    label: "விருந்தினர் வாட்ஸ்அப் எண்",
    name: "guest_whatsapp",
    required: true,
  },
  { label: "விருந்தினர் பூர்வீகம்", name: "guest_native", required: true },
];

const commandFields = [
  { label: "பெயர்", name: "name", required: true },
  { label: "தொலைபேசி", name: "mobile_1", required: true },
  {
    label: "குடும்பப் பெயர்",
    name: "family_name",
    required: true,
    type: "tel",
  },
  { label: "கையேடு புத்தகம் Sr எண்", name: "manual_book_srno", required: true },
  { label: "கருத்துக்கள்", name: "remarks", required: false },
  { label: "பொருள்", name: "product", required: true },
  { label: "ஏல தொகை", name: "bid_amount", required: true },
  { label: "இருப்பு தொகை", name: "balance_amount", required: true },
];

function YelamEntry() {
  const [selectedValue, setSelectedValue] = useState("inhouse");
  const [memberData, setMemberData] = useState({
    pulli_id: "",
    name: "",
    family_name: "",
    mobile_1: "",
  });
  const [yelamData, setYelamData] = useState({
    member: null,
    manual_book_srno: "",
    remarks: null,
    product: "",
    bid_amount: null,
    balance_amount: null,
    bidder_type: selectedValue,
    guest_name: null,
    guest_whatsapp: null,
    guest_native: null,
  });
  const [fetchMemberSuccess, setFetchMemberSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const fetchMember = async () => {
    const pulliId = memberData.pulli_id;
    setLoading(true);
    try {
      const res = await get(NEW_MEMBER_GET_URL(pulliId));
      if (res.status === 200) {
        const fetchedData = {};
        Object.keys(memberData).forEach((key) => {
          fetchedData[key] = res.data[key];
        });
        setMemberData(fetchedData);
        setFetchMemberSuccess(true);
        setLoading(false);
        return true;
      }
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000);
      return false;
    } finally {
    }
  };

  const getFieldsArray = () => {
    if (!fetchMemberSuccess && selectedValue === "inhouse") {
      return inhousePreFetchFields;
    } else if (!fetchMemberSuccess && selectedValue === "guest") {
      return externalPreFetchFields;
    } else if (fetchMemberSuccess && selectedValue === "inhouse") {
      return inhousePreFetchFields.concat(commandFields);
    } else if (fetchMemberSuccess && selectedValue === "guest") {
      return externalPreFetchFields.concat(commandFields);
    } else {
      return [];
    }
  };

  const handleSelectionChange = (value) => {
    setSelectedValue(value);
    setFetchMemberSuccess(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (memberData.hasOwnProperty(name)) {
      setMemberData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setYelamData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async () => {
    const combinedData = {
      ...yelamData,
      member: memberData.pulli_id,
      bidder_type: selectedValue,
    };
    try {
      const res = await create(YELAM_CREATE_URL(), combinedData);
      if (res.status === 201) {
        setLoading(false);
        setSuccessAlert(true);
        setTimeout(() => setSuccessAlert(false), 5000);
        navigate("/yelam-entry");
        clearAllData();
        return true;
      }
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000);
      return false;
    }
  };

  const clearAllData = () => {
    setMemberData({
      pulli_id: "",
      name: "",
      family_name: "",
      mobile_1: "",
    });

    setYelamData({
      member: null,
      manual_book_srno: "",
      remarks: null,
      product: "",
      bid_amount: null,
      balance_amount: null,
      bidder_type: selectedValue,
      guest_name: null,
      guest_whatsapp: null,
      guest_native: null,
    });

    setFetchMemberSuccess(false); // Reset to default selection (optional)
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px",
        flexDirection: "column",
      }}
    >
      <TopHeaderTitle pagename={"YELAM ENTRY"} />
      <Box>
        <RadioButton
          selectedValue={selectedValue}
          onSelectionChange={handleSelectionChange}
        />
      </Box>
      <Paper
        sx={{
          padding: "10px",
          backgroundColor: "rgb(255, 231, 218)",
          borderRadius: "0px",
          minHeight: "500px",
          maxHeight: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {getFieldsArray().map((field) => (
              <Grid key={field.name} item xs={12} sm={6}>
                <Input
                  required={field.required}
                  label={field.label}
                  name={field.name}
                  type={"text"}
                  value={
                    memberData.hasOwnProperty(field.name)
                      ? memberData[field.name]
                        ? memberData[field.name]
                        : ""
                      : yelamData[field.name]
                      ? yelamData[field.name]
                      : ""
                  }
                  onChange={handleInputChange} // Dynamic input change handling
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <CustomButton
            inverted={false}
            label="Cancel"
            onclick={clearAllData}
          />
          <CustomButton
            inverted={false}
            label={fetchMemberSuccess ? "Add Yelam" : "Fetch Member"}
            onclick={fetchMemberSuccess ? handleFormSubmit : fetchMember}
          />
        </Box>
      </Paper>

      {loading && <Loader />}
      <CustomAlert
        openAlert={successAlert}
        message="Yelam Added Successfully"
      />
      <CustomAlert
        openAlert={errorAlert}
        message="There was an error Fetching the member. Please Enter Valid Pulli Id"
      />
    </Box>
  );
}

export default YelamEntry;
