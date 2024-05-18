import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HomeLayout, Dashboard, AddContact, EditContact } from "./pages";

import { loader as contactLoader } from "./pages/Dashboard";
import { action as addContactAction } from "./pages/AddContact";
import { loader as editContactLoader } from "./pages/EditContact";
import { action as editContactAction } from "./pages/EditContact";
import { action as deleteContactAction } from "./pages/DeleteContact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/sa-contact/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: contactLoader(queryClient),
      },
      {
        path: "/sa-contact/add-contact",
        element: <AddContact />,
        action: addContactAction(queryClient),
      },
      {
        path: "/sa-contact/edit-contact/:id",
        element: <EditContact />,
        loader: editContactLoader(queryClient),
        action: editContactAction(queryClient),
      },
      {
        path: "/sa-contact/delete-contact/:id",
        action: deleteContactAction(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
