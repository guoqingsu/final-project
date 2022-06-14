import {Box, Container, Typography, TextField, Grid, Button} from '@mui/material';
import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import {requestLogin} from "../../services/users.service";
import useAuth from '../../auth/index';
const Signin = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await requestLogin(form.email, form.password);
      toast.success('Login successfully! Welcome!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (res && res.data) {
        login(res.data.token, res.data.username).then(() => {
          navigate('/');
        })
      }

    } catch (err) {

    }

  }
  return (
    <Container>
      <Box marginTop={'20px'} textAlign={'center'}>
        <Typography variant={'h3'} component={'span'}>Sign In</Typography>
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
            <Button type={'submit'} variant="contained" fullWidth>Submit</Button>
          </Grid>
        </Grid>
        <Grid container marginTop={'20px'} spacing={2} direction={'row'} justifyContent={'center'}>
          <Grid item xs={12} md={8} lg={5}>
            <Typography textAlign={'right'}>
              Not has Account?
              <Link to={'/signup'}>Register</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Signin;