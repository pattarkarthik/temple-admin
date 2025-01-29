import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";
import TopHeaderTitle from "../components/TopHeaderTitle";
import CustomAlert from "../components/CustomAlert";
import Loader from "../components/Loader";
import { create, get } from "../util/fetchUtils";
import { CATEGORIES_GET_ALL_URL, PRODUCT_CREATE_URL } from "../util/constants";
import { catalogListFields } from "../assets/Fields";
import TableList from "../components/TableList";
import CustomButton from "../components/CustomButton";
import CustomSelect from "../components/CustomSelect";
import Input from "../components/Input";
import {
  PRODUCT_ADDED_FAILURE_ALERT_MESSAGE,
  PRODUCT_ADDED_SUCCESSFUL_ALERT_MESSAGE,
} from "../util/alerts";

function YelamProductCatalog() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [successAlert, setSuccessAlert] = useState(false); // Success alert state
  const [errorAlert, setErrorAlert] = useState(false); // Error alert state
  const [newProduct, setNewProduct] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [successAlert]);

  const fetchProducts = async () => {
    try {
      const res = await get(CATEGORIES_GET_ALL_URL());
      setCategories(
        res.data.map((cat) => {
          return { label: cat.name, value: cat.name, id: cat.id };
        })
      );

      setProducts(
        res.data.flatMap((category) =>
          category.products.map((product) => ({
            name: product.product_name,
            category: category.name.toLowerCase(), // Convert category name to lowercase as per example
          }))
        )
      );

      setLoading(true);
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownChange = (value) => {
    setCategory(value);
    categories.forEach((cat) => {
      if (cat.value === value) {
        setCategoryId(cat.id);
      }
    });
  };
  const handleModalClose = () => {
    setCategoryId(null);
    setNewProduct("");
    setModalOpen(false);
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await create(PRODUCT_CREATE_URL(), {
        product_name: newProduct,
        category: categoryId,
      });
      if (res.status === 201) {
        setLoading(false);
        handleModalClose();
        setSuccessAlert(true);
        setAlertMessage(PRODUCT_ADDED_SUCCESSFUL_ALERT_MESSAGE);
        setTimeout(() => setSuccessAlert(false), 5000);
        return true;
      }
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setAlertMessage(PRODUCT_ADDED_FAILURE_ALERT_MESSAGE);
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
      }}
    >
      <TopHeaderTitle pagename={" PRODUCT CATALOG"} />
      {loading && <Loader />}
      <CustomAlert openAlert={successAlert} message={alertMessage} />
      <CustomAlert openAlert={errorAlert} message={alertMessage} />
      <TableList
        data={products}
        fields={catalogListFields}
        catalog={true}
        handleAddProductModal={() => setModalOpen(true)}
      />
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <form onSubmit={handleAddProduct}>
          <Box sx={{ width: "500px" }}>
            <DialogTitle fontWeight={600}>Add Product</DialogTitle>
            <DialogContent>
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
                  value={category}
                  onChange={(newValue) => handleDropdownChange(newValue)}
                  name="categories"
                  fields={categories}
                  label="Category"
                />
              </FormControl>
              <Input
                label="Product Name"
                name="product"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                fullWidth
                margin="normal"
                required={true}
                type={"text"}
              />
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
                  onclick={handleModalClose}
                />
                <CustomButton
                  inverted={false}
                  label="Add Product"
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

export default YelamProductCatalog;
