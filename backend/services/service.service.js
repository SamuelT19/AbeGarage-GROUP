const conn = require("../config/db.config");

const getExistingServiceNames = async () => {
  const query = "SELECT service_name FROM common_services";
  const rows = await conn.query(query);
  return rows.map((row) => row.service_name);
};

const createServices = async () => {
  const existingServiceNames = await getExistingServiceNames();
  const newServices = [
    {
      name: "Oil change",
      description:
        "Every 5,000 kilometers or so, you need to change the oil in your car to keep your engine in the best possible shape.",
      price: "30.25",
    },
    {
      name: "Spark Plug replacement",
      description:
        "Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start.",
      price: "43",
    },
    {
      name: "Fuel Cap tightening",
      description:
        "Loose fuel caps are actually a main reason why the ''check engine'' light in a car comes on.",
      price: "12",
    },
    {
      name: "Oxygen Sensor replacement",
      description:
        "Oxygen sensors measure the concentration of oxygen in the exhaust gabs in order to optimize engine performance and emissions.",
      price: "39.5",
    },
    {
      name: "Brake Work",
      description:
        "We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.",
      price: "25",
    },
    {
      name: "Tire repairs and changes",
      description:
        "Without good, inflated tires, you lose speed, control, and fuel efficiency, hence the need to get them patched if there is a leak (for example, if you run over a nail), or replaced if they''re too worn.",
      price: "55",
    },
    {
      name: "The ignition system",
      description:
        "A car''s ignition system includes its battery, starter, and the ignition itself.",
      price: "45.5",
    },
    {
      name: "Programming the camera software",
      description:
        "Cameras are essential to safer, more convenient, and technologically advanced driving experiences, whether by assisting drivers, enhancing vehicle capabilities, or improving security.",
      price: "30",
    },
  ];

  const servicesToInsert = newServices.filter((newService) => {
    return !existingServiceNames.includes(newService.name);
  });

  if (servicesToInsert.length === 0) {
    console.log("All services already exist in the database.");
    return;
  }

  const values = servicesToInsert
    .map(
      (service) =>
        `('${service.name}', '${service.description}','${service.price}')`
    )
    .join(", ");

  const query = `INSERT INTO common_services(service_name, service_description,service_price) VALUES ${values}`;
  const rows = await conn.query(query);
  return rows;
};
async function addService(service) {
  const checkquery =
    "SELECT service_name FROM common_services WHERE service_name = ?";
  const [check] = await conn.query(checkquery, [service.service_name]);
  if (check) {
    return;
  }

  const query =
    "INSERT INTO common_services (service_name, service_description, service_price) VALUES (?, ?, ?)";
  const rows = await conn.query(query, [
    service.service_name,
    service.service_description,
    service.service_price,
  ]);

  return rows;
}

const getSingleService = async (service_id) => {
  const query = "SELECT * FROM common_services WHERE service_id = ?";
  const row = await conn.query(query, [service_id]);
  return row;
};

const editService = async (service) => {
  let updatedService = {};

  if (
    service.service_name ||
    service.service_description ||
    service.service_price
  ) {
    const serviceQuery = `
        UPDATE common_services
        SET 
          ${service.service_name ? "service_name = ?," : ""}
          ${service.service_description ? "service_description = ?," : ""}
          ${service.service_price ? "service_price = ?" : ""}
        WHERE
          service_id = ?
      `;
    const queryParams = [
      service.service_name,
      service.service_description,
      service.service_price,
      service.service_id,
    ].filter((param) => param !== undefined && param !== "");

    const rows = await conn.query(serviceQuery, queryParams);
    if (rows) {
      updatedService = {
        service_name: service.service_name,
        service_description: service.service_description,
        service_price: service.service_price,
      };
    }
  }
  return updatedService;
};

async function deleteService(serviceId) {
  const query = "DELETE FROM common_services WHERE service_id = ?";
  const rows = await conn.query(query, [serviceId]);

  return true;
}

async function getAllServices() {
  const query = "SELECT * FROM common_services";
  const rows = await conn.query(query);
  return rows;
}

module.exports = {
  createServices,
  addService,
  getSingleService,
  editService,
  deleteService,
  getAllServices,
};
