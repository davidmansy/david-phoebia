import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState("");

  const callBackendAPI = async () => {
    const response = await fetch("/api");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  React.useEffect(() => {
    callBackendAPI()
      .then((res) => {
        console.log("res", res);
        setData(res.express);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p className="App-intro">{data}</p>
    </div>
  );
}

export default App;
