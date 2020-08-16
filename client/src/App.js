import React from "react";
import "./App.css";

function App() {
  const [users, setUsers] = React.useState([]);

  const callBackendAPI = async () => {
    const response = await fetch("/users");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  React.useEffect(() => {
    callBackendAPI()
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <p> Hello</p>
      {users.map(({ name, id }) => {
        return <p key={id}>{name}</p>;
      })}
    </div>
  );
}

export default App;
