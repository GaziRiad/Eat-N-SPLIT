import { useState } from "react";
import "./../index.css";

// let initialFriends = [
//   {
//     id: 118836,
//     name: "Clark",
//     image: "https://i.pravatar.cc/48?u=118836",
//     balance: -7,
//   },
//   {
//     id: 933372,
//     name: "Sarah",
//     image: "https://i.pravatar.cc/48?u=933372",
//     balance: 20,
//   },
//   {
//     id: 499476,
//     name: "Anthony",
//     image: "https://i.pravatar.cc/48?u=499476",
//     balance: 0,
//   },
// ];

function Button({ classB, onClick, children }) {
  return (
    <button className={`btn-primary ${classB}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState([
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ]);

  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    handleShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {showAddFriend && (
          <AddFriend friends={friends} OnAdd={handleAddFriend} />
        )}
        <Button classB={"add-friend--btn"} onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      <SplitBill />
    </div>
  );
}

function SplitBill() {
  return (
    <div className="split-bill--box">
      <h2>Split a bill with Sarah</h2>
      <form className="splitting-form">
        <label>💰 Bill value</label>
        <input type="number"></input>

        <label>🧍‍♂️ Your expanses</label>
        <input type="number"></input>

        <label>🧑‍🤝‍🧑Sarah expanses</label>
        <input type="number" disabled></input>

        <label>🤑 Who's paying the bill</label>
        <select>
          <option>You</option>
          <option value="friend">Sarah</option>
        </select>
        <span></span>
        <Button>Split bill</Button>
      </form>
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <div className="friend-list-wrapper">
      <ul className="friends-list">
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            name={friend.name}
            balance={friend.balance}
            image={friend.image}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ name, image, balance }) {
  return (
    <li className="friend-wrapper">
      <img src={image} alt={`${name}`} />
      <div className="friend-details">
        <h3>{name}</h3>
        <p style={{ color: balance > 0 ? "green" : balance < 0 ? "red" : {} }}>
          {balance > 0
            ? `${name} owes you ${balance}£`
            : balance === 0
            ? `You and ${name} are even`
            : `you owe ${name} ${Math.abs(balance)}£`}
        </p>
      </div>
      <Button>Select</Button>
    </li>
  );
}

function AddFriend({ OnAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    OnAdd(newFriend);
  }
  return (
    <div className="add-friend-wrapper" onSubmit={(e) => handleSubmit(e)}>
      <form className="add-friend-form">
        <label>🧑‍🤝‍🧑 Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>🖼️ Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>
        <span></span>
        <Button>Add</Button>
      </form>
    </div>
  );
}
