import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function OrdersList() {
  return (
    <>
      <section className='contact-section'>
        <div className='auto-container'>
          <div className='contact-title'>
            <h2>Orders</h2>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Id</th>
                <th> Customer</th>
                <th>Vehicle</th>
                <th>Order Date</th>
                <th>Received by</th>
                <th>Order status</th>
                <th>View/Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
                <td>
                  <Link to=''>
                    <FaEdit />
                  </Link>
                  <FaTrash />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
}

export default OrdersList;
