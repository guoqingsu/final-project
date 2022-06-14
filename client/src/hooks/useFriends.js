import {useEffect, useState} from "react";
import {authedRequest} from "../services/authedRequest";

const useFriends = (refresh) => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    authedRequest.get('/api/rooms')
      .then(res => {
        if (res && res.data) {
          setFriends(res.data);
        }
      })
  }, [refresh]);
  return friends;
}

export default useFriends;