import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Tabs from "./components/Tabs";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // retryDelay: 1000,
        // retry: 3,
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs />
    </QueryClientProvider>
  );
}

export default App;
