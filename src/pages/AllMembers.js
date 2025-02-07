import React, { useEffect, useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import TableList from "../components/TableList.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Profilepic from "../components/Profilepic.js";
import { allMembersFilter, newMembersFields } from "../assets/Data.js";
import CustomButton from "../components/CustomButton.js";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import Input from "../components/Input.js";
import TopHeaderTitle from "../components/TopHeaderTitle.js";
import {
  ALL_MEMBERS_GET_URL,
  NEW_MEMBER_GET_URL,
  NEW_MEMBER_UPDATE_URL,
} from "../util/constants.js";
import { editMemberFormFields } from "../assets/Fields.js";
import { useApiRequest } from "../util/customHooks/useApiRequest.js";
import {
  MEMBER_UPDATE_FAILURE_ALERT_MESSAGE,
  MEMBER_UPDATED_SUCCESSFULLY_ALERT_MESSAGE,
} from "../util/alerts.js";
import Modal from "../components/Modal.js";

function AllMembers() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [originalRow, setOriginalRow] = useState(null);
  const [uploadedHusbandProfilePic, setUploadedHusbandProfilePic] =
    useState(null);
  const [uploadedWifeProfilePic, setUploadedWifeProfilePic] = useState(null);

  const {
    loading,
    successAlert,
    errorAlert,
    alertMessage,
    fetchData,
    updateData,
  } = useApiRequest();

  useEffect(() => {
    const fetchMembers = async () => {
      const membersData = await fetchData(ALL_MEMBERS_GET_URL());
      if (membersData) setData(membersData);
    };
    fetchMembers();
  }, [successAlert]);

  const openEdit = async (id) => {
    const memberData = await fetchData(NEW_MEMBER_GET_URL(id));
    if (memberData) {
      setCurrentRow(memberData);
      setOriginalRow(memberData);
      setOpenEditModal(true);
    }
  };

  const handleFileChange = (file, type) => {
    if (type === "husband") {
      setUploadedHusbandProfilePic(file);
    } else if (type === "wife") {
      setUploadedWifeProfilePic(file);
    }
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setCurrentRow(null);
    setOriginalRow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name) => (event) => {
    setCurrentRow((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleSaveChanges = async () => {
    const changedFields = Object.keys(currentRow)
      .filter((key) => currentRow[key] !== originalRow[key])
      .reduce((acc, key) => {
        acc[key] = currentRow[key];
        return acc;
      }, {});

    const data = new FormData();
    if (uploadedHusbandProfilePic) {
      data.append("husband_photo", uploadedHusbandProfilePic); // "photo" should match the field name in your Django model
    }
    if (uploadedWifeProfilePic) {
      data.append("wife_photo", uploadedWifeProfilePic); // "photo" should match the field name in your Django model
    }
    Object.keys(changedFields).forEach((key) => {
      if (changedFields[key] !== undefined) {
        data.append(key, changedFields[key]);
      }
    });

    const updated = await updateData(
      NEW_MEMBER_UPDATE_URL(currentRow.pulli_id),
      data,
      MEMBER_UPDATED_SUCCESSFULLY_ALERT_MESSAGE,
      MEMBER_UPDATE_FAILURE_ALERT_MESSAGE
    );

    if (updated) {
      setOpenEditModal(false);
      setCurrentRow(null);
      setOriginalRow(null);
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
      <TopHeaderTitle pagename={"ALL MEMBERS"} />
      {loading && <Loader />}
      <CustomAlert openAlert={successAlert} message={alertMessage} />
      <CustomAlert openAlert={errorAlert} message={alertMessage} />
      <TableList
        openEdit={openEdit}
        data={data}
        fields={newMembersFields}
        showEdit={true}
        filterFields={allMembersFilter}
        page={"allmembers"}
        showActionButtons={true}

      />

      <Modal
        title="Edit Member"
        saveClickHandler={handleSaveChanges}
        saveBtnLabel={"Save Changes"}
        openModal={openEditModal}
        onClose={handleCloseModal}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "30px",
          }}
        >
          <Profilepic
            onFileChange={(file, type) => handleFileChange(file, type)}
            title={"Update Husband Photo"}
            type="husband"
            picPreview={originalRow ? originalRow.husband_photo : ""}
          />
          <Profilepic
            onFileChange={(file, type) => handleFileChange(file, type)}
            title={"Update Wife Photo"}
            type="wife"
            picPreview={originalRow ? originalRow.wife_photo : ""}
          />
        </Box>
        {editMemberFormFields.map((field) => (
          <div key={field.name}>
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
                <Box sx={{ width: "30%", fontSize: "17px" }}>{field.label}</Box>
                <Select
                  sx={{
                    width: "65%",
                    backgroundColor: "rgb(255, 250, 245)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f08001",
                    },
                  }}
                  value={currentRow ? currentRow[field.name] || "" : ""}
                  onChange={handleDropdownChange(field.name)}
                  label={field.label}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Input
                label={field.label}
                name={field.name}
                value={currentRow ? currentRow[field.name] || "" : ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required={field.required}
                type={field.type || "text"}
              />
            )}
          </div>
        ))}
      </Modal>
    </Box>
  );
}

export default AllMembers;
