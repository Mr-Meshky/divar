import Router from "router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import Toast from "components/modules/Toast";

import defaultOptions from "configs/reactQuery";

import Layout from "layouts/Layout";

const queryClient = new QueryClient({ defaultOptions });

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Toast />
          <Router />
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
