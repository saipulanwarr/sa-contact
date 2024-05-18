import { Form, redirect } from "react-router-dom";
import { SubmitBtn } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/contact", data);
      queryClient.invalidateQueries(["contact"]);
      toast.success("Contact added successfully ");
      return redirect("/sa-contact/");
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  };

const AddContact = () => {
  return (
    <div className="container">
      <Form method="post">
        <div className="mb-3 mt-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="firstName"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            name="lastName"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            className="form-control"
            placeholder="Age"
            name="age"
          />
        </div>
        <SubmitBtn />
      </Form>
    </div>
  );
};

export default AddContact;
