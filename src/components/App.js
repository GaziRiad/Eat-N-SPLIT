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
      <FriendsList />
      <SplitBill />
    </div>
  );
}

function SplitBill() {
  return (
    <div className="split-bill--box">
      <h2>Split a bill with Sarah</h2>
      <form className="splitting-form">
        <div>
          <label>💰 Bill value</label>
          <input type="number"></input>
        </div>

        <div>
          <label>🧍‍♂️ Your expanses</label>
          <input type="number"></input>
        </div>

        <div>
          <label>🧍‍♀️🧍 Sarah expanses</label>
          <input type="number"></input>
        </div>

        <div>
          <label>🤑 Who's paying the bill</label>
          <select>
            {friends.map((friend) => (
              <option value={friend.name}>{friend.name}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

function FriendsList() {
  return (
    <ul className="friends-list">
      {friends.map((friend) => (
        <Friend key={friend.id} name={friend.name} debt={friend.debts} />
      ))}
    </ul>
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
      <Button />
    </li>
  );
}

function AddFriend() {}

function Button() {
  return <button className="btn-primary">Select</button>;
}
