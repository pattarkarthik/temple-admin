import React, { useEffect, useState } from "react";
import RadioButton from "../components/RadioButton";
import { Box, FormControl, Grid, Paper } from "@mui/material";
import TopHeaderTitle from "../components/TopHeaderTitle";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../util/customHooks/useApiRequest";
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
import {
  MEMBER_FETCH_FAILURE_ALERT_MESSAGE,
  YELAM_ADDED_SUCCESSFUL_ALERT_MESSAGE,
} from "../util/alerts";

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
  const navigate = useNavigate();

  const {
    loading,
    errorAlert,
    successAlert,
    alertMessage,
    fetchData,
    postData,
  } = useApiRequest();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetchData(CATEGORIES_GET_ALL_URL());

    if (res) {
      setCategories(res.map((cat) => ({ label: cat.name, value: cat.name })));
      setProducts(
        res.reduce((acc, cat) => {
          acc[cat.name] = cat.products.map((pro) => ({
            label: pro.product_name,
            value: pro.id,
          }));
          return acc;
        }, {})
      );
    }
  };

  const fetchMember = async (e) => {
    e.preventDefault();
    const pulliId = memberData.pulli_id;
    const res = await fetchData(
      NEW_MEMBER_GET_URL(pulliId),
      "",
      MEMBER_FETCH_FAILURE_ALERT_MESSAGE
    );

    if (res) {
      setMemberData((prev) => ({
        ...prev,
        ...res,
      }));
      setFetchMemberSuccess(true);
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
    }
    return [];
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
    if (type === "number" && isNaN(Number(value))) return;

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const combinedData = {
      ...yelamData,
      member: memberData.pulli_id,
      bidder_type: selectedValue,
    };

    const res = await postData(
      YELAM_CREATE_URL(),
      combinedData,
      YELAM_ADDED_SUCCESSFUL_ALERT_MESSAGE,
      "Failed to add Yelam",
      () => navigate("/yelam-entry")
    );

    if (res) {
      clearAllData();
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

    setFetchMemberSuccess(false);
  };

  return (
    <Box sx={{ display: "flex", padding: "10px", flexDirection: "column" }}>
      <TopHeaderTitle pagename={"YELAM ENTRY"} />
      <Box>
        <RadioButton
          selectedValue={selectedValue}
          onSelectionChange={handleSelectionChange}
        />
      </Box>

      <form onSubmit={fetchMemberSuccess ? handleFormSubmit : fetchMember}>
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
                        memberData[field.name] || yelamData[field.name] || ""
                      }
                      readonly={field.readonly}
                      onChange={handleInputChange}
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
              type={fetchMemberSuccess ? "submit" : ""}
              // onclick={fetchMemberSuccess ? handleFormSubmit : fetchMember}
            />
          </Box>
        </Paper>
      </form>

      {loading && <Loader />}
      <CustomAlert openAlert={successAlert} message={alertMessage} />
      <CustomAlert openAlert={errorAlert} message={alertMessage} />
    </Box>
  );
}

export default YelamEntry;
