import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";

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
          <MainRoutes />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
