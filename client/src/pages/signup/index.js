import {useState} from "react";
import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import {requestRegister} from "../../services/users.service";
const Signup = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    confirmPassword: '',
    password: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.password !== form.confirmPassword) {
        toast.warn('Two passwords are not same!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const res = await requestRegister(form.username, form.email, form.password);
      toast.success('Register successfully! Please login', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {

    }
  }
  return (
    <Container>
      <Box marginTop={'20px'} textAlign={'center'}>
        <Typography variant={'h3'} component={'span'}>Sign Up</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container marginTop={'20px'} spacing={2} direction={'row'} justifyContent={'center'}>
          <Grid item xs={12} md={8} lg={5}>
            <TextField type={'email'}
                       required
                       value={form.email}
                       onChange={e => setForm({...form, email: e.target.value})}
                       label="Email"
                       variant="standard"
                       fullWidth/>
          </Grid>
        </Grid>
        <Grid container marginTop={'20px'} spacing={2} direction={'row'} justifyContent={'center'}>
          <Grid item xs={12} md={8} lg={5}>
            <TextField type={'text'}
                       required
                       value={form.username}
                       onChange={e => setForm({...form, username: e.target.value})}
                       label="Username"
                       variant="standard"
                       fullWidth/>
          </Grid>
        </Grid>
        <Grid container marginTop={'20px'} spacing={2} direction={'row'} justifyContent={'center'}>
          <Grid item xs={12} md={8} lg={5}>
            <TextField required
                       type={'password'}
                       label="Password"
                       value={form.password}
                       onChange={e => setForm({...form, password: e.target.value})}
                       variant="standard"
                       fullWidth/>
          </Grid>
        </Grid>
        <Grid container marginTop={'20px'} spacing={2} direction={'row'} justifyContent={'center'}>
          <Grid item xs={12} md={8} lg={5}>
            <TextField required
                       type={'password'}
                       label="Confirm Password"
                       value={form.confirmPassword}
                       onChange={e => setForm({...form, confirmPassword: e.target.value})}
                       variant="standard"
                       fullWidth/>
          </Grid>
        </Grid>
        <Grid container marginTop={'20px'} spacing={2} direction={'row'} justifyContent={'center'}>
          <Grid item xs={12} md={8} lg={5}>
            <Button type={'submit'} variant="contained" fullWidth>Submit</Button>
          </Grid>
        </Grid>
        <Grid container marginTop={'20px'} spacing={2} direction={'row'} justifyContent={'center'}>
          <Grid item xs={12} md={8} lg={5}>
            <Typography textAlign={'right'}>
              Already has Account?
              <Link to={'/signin'}>Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Signup;