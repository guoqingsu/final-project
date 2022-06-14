import {Box, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import {createRef, useEffect, useState} from "react";
import {authedRequest} from "../services/authedRequest";
const ChatBox = ({friend_id = null}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(true);
  const ref = createRef();

  const handleSend = async (e) => {
    if (e.keyCode === 13) {
      authedRequest.post(`/api/messages/${friend_id}`, {
        content: message
      }).then(res => {
        setRefresh(!refresh);
        setMessage('');
      })
    }
  }
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    if (friend_id) {
      authedRequest.get(`/api/messages/${friend_id}`)
        .then(res => {
          if (res && res.data) {
            setMessages(res.data);
            setTimeout(() => {
              setRefresh(!refresh);
            }, 500);
          }
        })
    }
  }, [friend_id, refresh]);
  const renderMessages = () => {
    return messages.map(message => {
      return (
        <ListItem key={message._id}>
          <Box>
            <Box display={'flex'} alignItems={'center'}>
              <AccountCircleIcon />
              <ListItemText style={{marginLeft: '5px'}} primary={message.sender.username}/>
            </Box>
            <Typography style={{marginLeft: '26px', color: 'gray'}} variant={'p'}>
              {message.content}
            </Typography>
            <p style={{paddingLeft: '26px'}}>
              <i>{new Date(message.createdTime).toLocaleString()}</i>
            </p>
          </Box>
        </ListItem>
      )
    })
  }
  return (
    <Box padding={'10px'} bgcolor={'white'}>
      <Box height={'60vh'} overflow={'auto'} ref={ref}>
        <Box>
          {friend_id && <List sx={{width: '100%'}}>
            {renderMessages()}
          </List>}
          {!friend_id &&
            <Typography variant={'h6'}>Select a friend and enter message!</Typography>
          }
        </Box>
      </Box>
      <Box>
        <TextField multiline
                   disabled={!Boolean(friend_id)}
                   fullWidth
                   value={message}
                   onChange={e => setMessage(e.target.value)}
                   onKeyDown={handleSend}
                   rows={7}
                   placeholder={
                    friend_id ? 'Enter your reply here' : 'Please firstly select a friend!'
                   }/>
      </Box>
    </Box>
  )
}

export default ChatBox;