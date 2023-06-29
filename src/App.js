import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { PLP } from "./pages/PLP";

function App() {
  console.log(process.env.REACT_APP_CLIENT_URL);
  const client = new ApolloClient({
    uri: process.env.REACT_APP_CLIENT_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <PLP />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
