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

  const [friendSelected, setFriendSelected] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend) {
    setFriendSelected((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriendSelected((friendSelected) => (friendSelected.balance = value));
    setFriendSelected(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelect={handleSelectFriend}
          friendSelected={friendSelected}
        />

        {showAddFriend && (
          <AddFriend friends={friends} OnAdd={handleAddFriend} />
        )}

        <Button classB={"add-friend--btn"} onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>

      {friendSelected ? (
        <SplitBill
          friend={friendSelected}
          // setFriendSelected={setFriendSelected}
          onSplit={handleSplitBill}
          key={friendSelected.id}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

function FriendList({ friends, onSelect, friendSelected }) {
  return (
    <div className="friend-list-wrapper">
      <ul className="friends-list">
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            onSelect={onSelect}
            friendSelected={friendSelected}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelect, friendSelected }) {
  return (
    <li
      className={
        friend.id === friendSelected?.id
          ? "friend-wrapper friend--active"
          : "friend-wrapper"
      }
    >
      <img src={friend.image} alt={`${friend.name}`} />
      <div className="friend-details">
        <h3>{friend.name}</h3>
        <p
          style={{
            color:
              friend.balance > 0
                ? "green"
                : friend.balance < 0
                ? "red"
                : "#333",
          }}
        >
          {friend.balance > 0
            ? `${friend.name} owes you ${friend.balance}£`
            : friend.balance === 0
            ? `You and ${friend.name} are even`
            : `you owe ${friend.name} ${Math.abs(friend.balance)}£`}
        </p>
      </div>
      <Button onClick={() => onSelect(friend)}>
        {friendSelected?.id === friend.id ? "close" : "select"}
      </Button>
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

function SplitBill({ friend, setFriendSelected, onSplit }) {
  const [bill, setBill] = useState("");
  const [userExpanses, setUserExapanses] = useState("");
  const [whoPays, setWhoPays] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userExpanses) return;

    onSplit(
      whoPays === "user"
        ? friend.balance + (bill - userExpanses)
        : friend.balance - userExpanses
    );
  }

  return (
    <div className="split-bill--box">
      <h2>Split a bill with {friend.name}</h2>
      <form className="splitting-form" onSubmit={handleSubmit}>
        <label>💰 Bill value</label>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill((bill) => +e.target.value)}
        ></input>

        <label>🧍‍♂️ Your expanses</label>
        <input
          type="number"
          value={userExpanses}
          onChange={(e) =>
            setUserExapanses((userExpanses) =>
              +e.target.value > bill ? userExpanses : +e.target.value
            )
          }
        ></input>

        <label>🧑‍🤝‍🧑{friend.name} expanses</label>
        <input type="number" value={bill - userExpanses} disabled></input>

        <label>🤑 Who's paying the bill</label>
        <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
          <option value="user">You</option>
          <option value="friend">{friend.name}</option>
        </select>
        <span></span>
        <Button>Split bill</Button>
      </form>
    </div>
  );
}
