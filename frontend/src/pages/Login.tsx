import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  InputAdornment
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const handleLogin = async () => {

    try{

      const res = await api.post("/auth/login",{
        username,
        password
      });

      localStorage.setItem("user",JSON.stringify(res.data));

      navigate("/dashboard");

    }catch(err){

      alert("Invalid username or password");

    }

  };

  return (

    <Box
      sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"linear-gradient(135deg,#e6eef8,#f6f8fb)"
      }}
    >

      <Card sx={{width:400,borderRadius:3}}>

        <CardContent>

          <Typography
            variant="h4"
            align="center"
            sx={{color:"#d64b1f",fontWeight:"bold"}}
          >
            नगर परिषद नशिराबाद
          </Typography>

          <Typography
            align="center"
            sx={{mb:3,fontSize:20,color:"#5a2d1a"}}
          >
            लेखा विभाग
          </Typography>

          <TextField
            label="User Name"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton
                    onClick={()=>setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{mt:2}}
            onClick={handleLogin}
          >
            Login
          </Button>

        </CardContent>

      </Card>

    </Box>

  );

}