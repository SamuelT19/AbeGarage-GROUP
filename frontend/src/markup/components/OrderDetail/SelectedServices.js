// import React from "react";
// import { useState, useEffect } from "react";
// import Orderservice from "../../../services/order.service";
// import { useAuth } from "../../../Contexts/AuthContext";

// function SelectedServices(singleOrder) {
//   //distructure the singleOrder
//   const { singleOrder } = singleOrder;

//   // Implement component logic here
//   //initializing the state
//   //   const [orderedServices, setorderedServices] = useState([]);

//   //   // Get logged-in employee token from the context
//   //   const { employee } = useAuth();
//   //   const token = employee ? employee.employee_token : null;

//   //   useEffect(() => {
//   //     const fetchOrders = async () => {
//   //       try {
//   //         const response = await Orderservice.orderedServices(token);
//   //         setorderedServices(response);
//   //         console.log(response);
//   //       } catch (error) {
//   //         console.log(error);
//   //       }
//   //     };
//   //     fetchOrders();
//   //   }, [token]);

//   return (
//     <>
//       {/* {apiError ? (
//         <section className='contact-section'>
//           <div className='auto-container'>
//             <div className='contact-title'>
//               <h2>{apiErrorMessage}</h2>
//             </div>
//           </div>
//         </section>
//       ) : (
//         <section className='contact-section'>
//           <div className='auto-container'>
//             <div className='contact-title'>
//               <h2 className='title'>Services we provide</h2>
//               <div className='text22'>
//                 Bring to the table win-win strategies to ensure proactive
//                 domination. At the end of the day, going forward, a new normal
//                 that has evolved from generation to generation is on the runway
//                 heading towards a streamlined cloud solution.
//               </div>
//             </div>
//             <section className='service-section'>
//               <div className='auto-container'>
//                 <div className='wrapper-box'>
//                   <div className='left-column'>
//                     {services.map((service) => (
//                       <div
//                         className='service-list'
//                         key={service.service_id}
//                         style={{ marginBottom: "5px" }}>
//                         <div className='service-name1'>
//                           <h2 className='Name'>{service.service_name}</h2>
//                           <div>{service.service_description}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <br />
//                   <NewService />
//                 </div>
//               </div>
//             </section>
//           </div>
//         </section>
//       )} */}

//       <div>Requested Services </div>
//     </>
//   );
// }

// export default SelectedServices;
