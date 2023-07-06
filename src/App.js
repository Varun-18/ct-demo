import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MainRoutes } from "./routes/MainRoutes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_CLIENT_URL,
    cache: new InMemoryCache(),
    // credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
        <Router>
          <MainRoutes />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
