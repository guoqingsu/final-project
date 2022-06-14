import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import Form from "../../components/form";
import Friends from "../../components/friends";
import ChatBox from "../../components/chat-box";
import {useEffect, useState} from "react";
import useFriends from "../../hooks/useFriends";
import useAuth from '../../auth/index';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import {authedRequest} from "../../services/authedRequest";
import { toast } from 'react-toastify';
const Home = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [refreshFriends, setRefreshFriends] = useState(true);
  const friends = useFriends(refreshFriends);
  const [activatedFriend, setActivatedFriend] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setRefreshFriends(!refreshFriends);
    }, 500);
  }, [friends]);
  const handleCreateRoom = async (roomName) => {
    const res = await authedRequest.post(`/api/rooms/create-room`, {
      name: roomName
    });
    toast.success('Create room successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setRefreshFriends(!refreshFriends);
  }

  const handleJoinRoom = async (roomName) => {
    await authedRequest.post(`/api/rooms/join-room/${roomName}`);
    toast.success('Join room successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setRefreshFriends(!refreshFriends);
  }

  const handleChatFriend = async (friendName) => {
    await authedRequest.post(`/api/messages/friend/${friendName}`);
    // open friend chat window
    setRefreshFriends(!refreshFriends);
  }

  const handleLogout = () => {
    auth.logout().then(() => {
      navigate('/signin');
    });
  }

  return (
    <Container style={{background: 'whitesmoke'}}>
      <Box marginTop={'20px'} paddingTop={'20px'} paddingBottom={'20px'}>
        <Grid container padding={0} spacing={2}>
          <Grid item xs={3}>
            <Form handleCreateRoom={handleCreateRoom}
                  handleChatFriend={handleChatFriend}
                  handleJoinRoom={handleJoinRoom}/>
            <Friends friends={friends}
                     onSelectFriend={(friend_id) => setActivatedFriend(friend_id)}
                     activeFriend={activatedFriend}/>
            <Box bgcolor={'white'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} textAlign={'right'} boxSizing={'border-box'} padding={'10px'}>
              <Typography>Hello! <strong>{auth.username}</strong></Typography>
              <ExitToAppIcon onClick={handleLogout} sx={{fontSize: '40px', cursor: 'pointer'}}/>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <ChatBox friend_id={activatedFriend}/>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Home;