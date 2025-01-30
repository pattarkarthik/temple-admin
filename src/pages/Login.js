import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../util/constants";
import "../assets/styles/Form.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import { LOGIN_URL } from "../util/constants";
import { create } from "../util/fetchUtils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await create(LOGIN_URL(), { username, password });

      // Save tokens to localStorage
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      // Navigate to the dashboard or home page
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",

        backgroundColor: "#f6f6f7",
        width: "100dvw",
        height: "100dvh",
        backgroundImage:
          "url('https://static.wixstatic.com/media/35364f_5b5ce4ffb5684f46922e67664a63fe93~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/35364f_5b5ce4ffb5684f46922e67664a63fe93~mv2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="form-container"
        style={{
          border: "1px solid #ADD8E6 ", // Thin border
          borderRadius: "5px", // Optional rounded corners
        }}
      >
        <Typography sx={{ color: "white" }} variant="h4">
          Sign In
        </Typography>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <CustomButton
            inverted={false}
            label="Login"
            onClick={handleSubmit}
            type="submit"
            style={{
              textAlign: "center",
              borderRadius: "4px",
              alignItems: "center",
              margin: "0 auto",
            }}
          />
        )}
      </form>
    </Box>
  );
}

export default Login;
