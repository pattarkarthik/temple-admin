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
import WhatsappModal from "../components/WhatsappModal.js";

function WhatsappModule() {
  const [openEditModal, setOpenEditModal] = useState(false);

  const [openWhatsAppModal, setOpenWhatsAppModal] = useState(false);
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
      <TopHeaderTitle pagename={"COMMUNICATION MODULE"} />
      {loading && <Loader />}
      <CustomAlert openAlert={successAlert} message={alertMessage} />
      <CustomAlert openAlert={errorAlert} message={alertMessage} />

      <TableList
        //openEdit={openEdit}
        data={data}
        fields={newMembersFields}
        showEdit={false}
        filterFields={allMembersFilter}
        page={"Whatsapp"}
        showActionButtons={false}
        showWhatsAppButton={true} // ✅ Show WhatsApp button only here
        onWhatsAppClick={() => setOpenWhatsAppModal(true)} // ✅ Handle button click
      />

      {/* WhatsApp Modal */}
      <WhatsappModal
        open={openWhatsAppModal}
        onClose={() => setOpenWhatsAppModal(false)}
      />
    </Box>
  );
}

export default WhatsappModule;
