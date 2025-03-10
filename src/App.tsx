import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import FormTabs from "./components/FormTabs";

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
      <FormTabs />
    </QueryClientProvider>
  );
}

export default App;
