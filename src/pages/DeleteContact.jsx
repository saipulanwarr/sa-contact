import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/contact/${params.id}`);
      queryClient.invalidateQueries(["contact"]);

      toast.success("Contact deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
    return redirect("/sa-contact/");
  };
