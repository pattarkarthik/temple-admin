import React, { useEffect, useState } from "react";
import RadioButton from "../components/RadioButton";
import { Box, FormControl, Grid, Paper } from "@mui/material";
import TopHeaderTitle from "../components/TopHeaderTitle";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";
import { create, get } from "../util/fetchUtils";
import {
  CATEGORIES_GET_ALL_URL,
  NEW_MEMBER_GET_URL,
  YELAM_CREATE_URL,
} from "../util/constants";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import CustomSelect from "../components/CustomSelect";
import {
  commanYelamFormFields,
  externalPreFetchYelamFields,
  inhousePreFetchYelamFields,
} from "../assets/Fields";
import { YELAM_ADDED_SUCCESSFUL_ALERT_MESSAGE } from "../util/alerts";

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
    bidder_type: selectedValue,
    guest_name: null,
    guest_whatsapp: null,
    guest_native: null,
  });
  const [fetchMemberSuccess, setFetchMemberSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await get(CATEGORIES_GET_ALL_URL());
      if (res.status === 200) {
        setCategories(
          res.data.map((cat) => {
            return { label: cat.name, value: cat.name };
          })
        );
        setProducts(
          res.data.reduce((acc, cat) => {
            acc[cat.name] = cat.products.map((pro) => ({
              label: pro.product_name,
              value: pro.id,
            }));
            return acc;
          }, {})
        );
        setLoading(false);
        return true;
      }
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000);
      return false;
    }
  };
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
    }
  };

  const getFieldsArray = () => {
    if (!fetchMemberSuccess && selectedValue === "inhouse") {
      return inhousePreFetchYelamFields;
    } else if (!fetchMemberSuccess && selectedValue === "guest") {
      return externalPreFetchYelamFields;
    } else if (fetchMemberSuccess && selectedValue === "inhouse") {
      return inhousePreFetchYelamFields.concat(commanYelamFormFields);
    } else if (fetchMemberSuccess && selectedValue === "guest") {
      return externalPreFetchYelamFields.concat(commanYelamFormFields);
    } else {
      return [];
    }
  };

  const handleSelectionChange = (value) => {
    setSelectedValue(value);
    setFetchMemberSuccess(false);
  };
  const handleDropdown = (value, field) => {
    if (field.name === "category") {
      setSelectedCategory(value);
    } else if (field.name === "product") {
      setYelamData((prev) => ({
        ...prev,
        product: value,
      }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let updatedValue = value;
    if (type === "number" && isNaN(Number(updatedValue))) {
      return;
    }
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
    console.log(combinedData);
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
      category: "",
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
              <Grid key={field.label} item xs={12} sm={6}>
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
                      value={yelamData[field.name]}
                      onChange={(value) => handleDropdown(value, field)}
                      name={field.name}
                      fields={
                        field.name === "category"
                          ? categories
                          : products[selectedCategory] || []
                      }
                      label={field.label}
                    />
                  </FormControl>
                ) : (
                  <Input
                    required={field.required}
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
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
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
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
        message={YELAM_ADDED_SUCCESSFUL_ALERT_MESSAGE}
      />
      <CustomAlert
        openAlert={errorAlert}
        message="There was an error Fetching the member. Please Enter Valid Pulli Id"
      />
    </Box>
  );
}

export default YelamEntry;
