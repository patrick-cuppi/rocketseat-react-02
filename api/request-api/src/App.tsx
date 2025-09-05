import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewUserForm from "./components/user-new-form";
import UserInfo from "./components/user-info";
import UsersList from "./components/users-list";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <UserInfo />
        <NewUserForm />
        <UsersList />
      </main>
    </QueryClientProvider>
  );
}

export default App;
