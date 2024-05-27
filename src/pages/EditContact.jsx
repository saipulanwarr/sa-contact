import { Form, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { SubmitBtn } from "../components";
import { useQuery } from "@tanstack/react-query";

export const singleContactQuery = (id) => {
  return {
    queryKey: ["contact", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/contact/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleContactQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/contact/${params.id}`, data);
      queryClient.invalidateQueries(["contact"]);
      toast.success("Contact edited successfully");
      return redirect("/sa-contact/");
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  };

const EditContact = () => {
  const id = useLoaderData();
  const { data } = useQuery(singleContactQuery(id));

  return (
    <div className="container-sm">
      <Form method="post">
        <div className="mb-3 mt-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            defaultValue={data.data.firstName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            defaultValue={data.data.lastName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            className="form-control"
            placeholder="Age"
            defaultValue={data.data.age}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Photo</label>
          <input type="file" className="form-control" />
        </div>
        <SubmitBtn />
      </Form>
    </div>
  );
};

export default EditContact;
