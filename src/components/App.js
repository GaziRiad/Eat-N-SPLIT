import "./../index.css";

const friends = [
  {
    id: 1,
    name: "Sarah",
    debts: 0,
  },
  {
    id: 2,
    name: "Anthony",
    debts: 0,
  },
  // {
  //   id: 3,
  //   name: "Clarck",
  //   debts: 0,
  // },
];

export default function App() {
  return (
    <div className="app">
      <Sidebar />
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
        <input type="number"></input>

        <label>🤑 Who's paying the bill</label>
        <select>
          <option>You</option>
          {friends.map((friend) => (
            <option value={friend.name} key={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="Side-bar">
      <FriendList />
      <AddFriend />
    </div>
  );
}

function FriendList() {
  return (
    <div className="friend-list-wrapper">
      <ul className="friends-list">
        {friends.map((friend) => (
          <Friend key={friend.id} name={friend.name} debt={friend.debts} />
        ))}
      </ul>
      <Button className="add-friend--btn">Add Friend</Button>
    </div>
  );
}

function Friend({ name, debt }) {
  return (
    <li className="friend-wrapper">
      <img src="imgs/friend.jpg" alt="friend img" />
      <div className="friend-details">
        <h3>Riad H.</h3>
        <p>You and {name} are even</p>
      </div>
      <Button>Select</Button>
    </li>
  );
}

function AddFriend() {
  return (
    <div className="add-friend-wrapper">
      <form className="add-friend-form">
        <label>🧑‍🤝‍🧑 Friend name</label>
        <input type="text"></input>
        <label>🖼️ Image URL</label>
        <input type="text"></input>
        <span></span>
        <Button>Add</Button>
      </form>
    </div>
  );
}

function Button({ children }) {
  return <button className="btn-primary">{children}</button>;
}
