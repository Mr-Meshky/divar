import Router from "router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import defaultOptions from "configs/reactQuery";

const queryClient = new QueryClient({ defaultOptions });

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
