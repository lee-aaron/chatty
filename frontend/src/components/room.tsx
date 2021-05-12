import React, { MouseEvent } from "react";

import "../css/room.css";
import { toast } from 'react-toastify';

function Room() {

  const [roomCode, setRoomCode] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleJoinRoom = React.useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if ( roomCode.length === 0 || username.length === 0) {
      toast.error("Room Code and Username must not be empty!", {
        autoClose: 3000,
        pauseOnHover: false
      });
      return;
    }
  }, [roomCode, username]);

  const handleCreateRoom = React.useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if ( roomCode.length === 0 || username.length === 0) {
      toast.error("Room Code and Username must not be empty!", {
        autoClose: 3000,
        pauseOnHover: false
      });
      return;
    }
  }, [roomCode, username]);

  return (
    <main className="room">
      <section>
        <h4>Room Service</h4>
        <input type="text" autoComplete="off" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" autoComplete="off" placeholder="Room Code" onChange={(e) => setRoomCode(e.target.value)} />
        <button type="submit" onClick={handleJoinRoom}>Join Room</button>
        <button type="submit" onClick={handleCreateRoom}>Create Room</button>
      </section>
    </main>
  );

}

export default Room;