import { useContext} from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { FaEdit } from "react-icons/fa";

import { useAuth } from "../../../../../../src/Contexts/AuthContext";
import { Link } from "react-router-dom";


function OrderCustomerCard(customerData) {
//   
  return (
    <section className="contact-section card-customer-section">
      <div className="auto-container create-new">
        <div className="contact-title">
          <h2>Edit order</h2>
          <div className="card card-text">
            <h5>
              Name {customerData.customer_first_name}{" "}
              {customerData.customer_last_name}
            </h5>
            <p>Email: {customerData.customer_email}</p>
            <p>Phone number: {customerData.customer_phone_number}</p>
            <p>
              Active customer:
              {customerData.active_customer_status == 1 ? "Yes" : "No"}
            </p>

            <div className="edit-delete-icons"></div>
            <Link to={`/admin/customer/edit/${customerData.customer_id}`}>
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

export default OrderCustomerCard;
