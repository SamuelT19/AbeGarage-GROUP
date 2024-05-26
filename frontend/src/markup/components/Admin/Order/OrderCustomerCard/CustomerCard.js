import { useContext,useState, useEffect } from "react";

// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react to use close icon
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import { FaEdit } from "react-icons/fa";
import customerService from "../../../../../services/customer.service";
import { useAuth } from "../../../../../../src/Contexts/AuthContext";
import { useParams, useNavigate, Link } from "react-router-dom";





function CustomerCard( ){
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");
  const [active_customer_status, setActiveCustomerStatus] = useState(1);
  const { customer_id } = useParams();
  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await customerService.getCustomerById(
          customer_id,
          loggedInEmployeeToken
        );
        console.log(data);

        setEmail(data.customer[0].customer_email);
        setFirstName(data.customer[0].customer_first_name);
        setLastName(data.customer[0].customer_last_name);
        setPhoneNumber(data.customer[0].customer_phone_number);
        setActiveCustomerStatus(data.customer.customer_active_status);
        // Update the customer data in the CustomerContext
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData();
  }, [customer_id, loggedInEmployeeToken]);
  
  return (
    <section className="contact-section card-customer-section">
      <div className="auto-container create-new">
        <div className="contact-title ">
          <h2>Create a new order </h2>
          <div className="card card-text">
            <h5>
              Name {customer_first_name} {customer_last_name}
            </h5>
            <p>Email: {customer_email}</p>
            <p>Phone number {customer_phone_number}:</p>
            <p>
              Active customer:
              {active_customer_status == 1 ? "Yes" : "No"}
            </p>

            <div className="edit-delete-icons"></div>
            <Link to={`/admin/customer/edit/${customer_id}`}>
              Edit customer <FaEdit />
            </Link>
            <span className="close-icon">
              <Link to={`/admin/order/new-order`}>
                <DisabledByDefaultIcon />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerCard;
