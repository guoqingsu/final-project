import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import useAuth from '../auth/index';
const Friends = ({friends = [], activeFriend = null, onSelectFriend}) => {
  const auth = useAuth();
  const renderFriends = () => {
    return friends.map(friend => {
      const activated = friend._id === activeFriend;
      const isGroup = Boolean(friend.name);
      let friendName = friend.name;
      if (!friendName) {
        friendName = friend.users.find(user => user.username !== auth.username).username;
      }
      return (
        <ListItem key={friend._id}
                  onClick={() => onSelectFriend && onSelectFriend(friend._id)}
                  style={{background: activated ? 'gainsboro' : 'white'}}>
          { isGroup &&
            <SupervisedUserCircleIcon />
          }
          { !isGroup &&
            <AccountCircleIcon />
          }
          <ListItemText style={{marginLeft: '5px'}} primary={friendName}/>
        </ListItem>
      )
    })
  }
  return (
    <Box bgcolor={'white'} height={'60vh'} overflow={'auto'} marginTop={'20px'}>
      <List sx={{width: '100%'}}>
        {renderFriends()}
      </List>
    </Box>
  )
}

export default Friends;