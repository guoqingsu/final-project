import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";

const Form = ({handleCreateRoom, handleJoinRoom, handleChatFriend}) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [oldRoomName, setOldRoomName] = useState('');
  const [friendName, setFriendName] = useState('');
  return (
    <Box>
      <Box display={'flex'} alignItems={'center'}>
        <TextField size={'small'}
                   value={newRoomName}
                   onChange={e => setNewRoomName(e.target.value)}
                   style={{background: 'white', marginRight: '5px'}}
                   variant={'outlined'}
                   placeholder={'Enter room name'} />
        <Button variant={'contained'}
                onClick={() => newRoomName && handleCreateRoom && handleCreateRoom(newRoomName)}
                style={{width: '100px'}}>Create</Button>
      </Box>
      <Box display={'flex'} marginTop={'14px'} alignItems={'center'}>
        <TextField size={'small'}
                   value={oldRoomName}
                   onChange={e => setOldRoomName(e.target.value)}
                   style={{background: 'white', marginRight: '5px'}}
                   variant={'outlined'}
                   placeholder={'Enter room name'} />
        <Button color={'success'}
                onClick={() => oldRoomName && handleJoinRoom && handleJoinRoom(oldRoomName)}
                style={{width: '100px'}}
                variant={'contained'}>Join</Button>
      </Box>
      <Box display={'flex'} marginTop={'14px'} alignItems={'center'}>
        <TextField size={'small'}
                   value={friendName}
                   onChange={e => setFriendName(e.target.value)}
                   style={{background: 'white', marginRight: '5px'}}
                   variant={'outlined'}
                   placeholder={'Enter friend name'} />
        <Button color={'secondary'}
                onClick={() => friendName && handleChatFriend && handleChatFriend(friendName)}
                style={{width: '100px'}}
                variant={'contained'}>Chat</Button>
      </Box>
    </Box>
  )
}

export default Form;