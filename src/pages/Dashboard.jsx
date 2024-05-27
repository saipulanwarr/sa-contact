import { Link, Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import imgDefault from "../assets/default.jpeg";
import isValidUrl from "../utils/isValidUrl";

const contactQuery = {
  queryKey: ["contact"],
  queryFn: async () => {
    const { data } = await customFetch.get("/contact");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(contactQuery);
  return null;
};

const Dashboard = () => {
  const { data } = useQuery(contactQuery);

  return (
    <div className="container">
      <Link
        className="btn btn-primary btn-sm mt-3 mb-2"
        to="/sa-contact/add-contact"
      >
        + Add New Contact
      </Link>
      <table className="table table-bordered table-hover mt-10">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Photo</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Age</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={isValidUrl(item.photo) ? item.photo : imgDefault}
                  alt="Girl in a jacket"
                  width="50"
                  height="50"
                  className="rounded"
                />
              </td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td width="12%">
                <div className="row">
                  <div className="col">
                    <Link
                      to={`/sa-contact/edit-contact/${item.id}`}
                      className="btn btn-warning btn-sm mr-2"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="col">
                    <Form
                      method="post"
                      action={`/sa-contact/delete-contact/${item.id}`}
                    >
                      <button type="submit" className="btn btn-danger btn-sm">
                        Delete
                      </button>
                    </Form>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
