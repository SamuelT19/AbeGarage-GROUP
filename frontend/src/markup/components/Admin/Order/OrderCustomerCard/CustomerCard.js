import { useContext, useEffect, useState } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { FaEdit } from "react-icons/fa";
import customerService from "../../../../../services/customer.service";
import { useAuth } from "../../../../../../src/Contexts/AuthContext";
import { useParams, useNavigate, Link } from "react-router-dom";

function CustomerCard() {
  const { customer_id } = useParams();
  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";
  const [customerData, setCustomerData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await customerService.getCustomerById(
          customer_id,
          loggedInEmployeeToken
        );
        console.log(data);

        setCustomerData({
          customer_email: data.customer[0].customer_email,
          customer_first_name: data.customer[0].customer_first_name,
          customer_last_name: data.customer[0].customer_last_name,
          customer_phone_number: data.customer[0].customer_phone_number,
          active_customer_status: data.customer[0].customer_active_status,
        });
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData();
  }, [customer_id, loggedInEmployeeToken]);

  return (
    <section className="contact-section ">
      <div className="auto-container create-new">
        <div className="contact-title">
          <h2 >Create a new order</h2>
          <div className="card card-text">
            <h5>
              Name {customerData?.customer_first_name}{" "}
              {customerData?.customer_last_name}
            </h5>
            <p>Email: {customerData?.customer_email}</p>
            <p>Phone number: {customerData?.customer_phone_number}</p>
            <p>
              Active customer:
              {customerData?.active_customer_status === 1 ? "Yes" : "No"}
            </p>

            <div className="edit-delete-icons">
              <Link to={`/admin/customer/edit/${customer_id}`}>
                Edit customer <FaEdit style={{ color: "red" }} />
              </Link>
              <span
                className="close-icon"
                onClick={() => navigate(`/admin/order/new-order`)}
                style={{ cursor: "pointer" }}
              >
                <DisabledByDefaultIcon style={{ color: "red" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerCard;
