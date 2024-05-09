import React, { useEffect } from "react";

function AddEditVehicle({
  renderType,
  handleSubmit,
  vehicle_year,
  setVehicleYear,
  vehicle_make,
  setVehicleMake,
  vehicle_model,
  setVehicleModel,
  vehicle_type,
  setVehicleType,
  vehicle_mileage,
  setVehicleMileage,
  vehicle_tag,
  setVehicleTag,
  vehicle_serial,
  setVehicleSerial,
  vehicle_color,
  setVehicleColor,
  serverError,
  showForm,
  setShowForm,
}) {
  return (
    <section className='contact-section'>
      <div className='auto-container'>
        <div className='contact-title'>
          <h2>
            {renderType === "add" ? "Add a new vehicle" : "Edit vehicle data"}
          </h2>
          {renderType === "edit"}
        </div>
        <div className='row clearfix'>
          <div className='form-column col-lg-7'>
            <div className='inner-column'>
              <div className='contact-form'>
                <form onSubmit={handleSubmit}>
                  <div className='row clearfix'>
                    <div className='form-group col-md-12'>
                      {serverError && (
                        <div className='validation-error' role='alert'>
                          {serverError}
                        </div>
                      )}
                      <label htmlFor='vehicle_year'></label>
                      <input
                        type='text'
                        name='vehicle_year'
                        id='vehicle_year'
                        value={vehicle_year}
                        onChange={(event) => setVehicleYear(event.target.value)}
                        placeholder='Vehicle year'
                        required
                      />
                    </div>

                    <div className='form-group col-md-12'>
                      <label htmlFor='vehicle_make'></label>
                      <input
                        type='text'
                        name='vehicle_make'
                        id='vehicle_make'
                        value={vehicle_make}
                        onChange={(event) => setVehicleMake(event.target.value)}
                        placeholder='Vehicle make'
                        required
                      />
                    </div>

                    <div className='form-group col-md-12'>
                      <label htmlFor='vehicle_model'></label>
                      <input
                        type='text'
                        name='vehicle_model'
                        id='vehicle_model'
                        value={vehicle_model}
                        onChange={(event) =>
                          setVehicleModel(event.target.value)
                        }
                        placeholder='Vehicle model'
                        required
                      />
                    </div>

                    <div className='form-group col-md-12'>
                      <label htmlFor='vehicle_type'></label>
                      <input
                        type='text'
                        name='vehicle_type'
                        id='vehicle_type'
                        value={vehicle_type}
                        onChange={(event) => setVehicleType(event.target.value)}
                        placeholder='Vehicle type'
                        required
                      />
                    </div>

                    <div className='form-group col-md-12'>
                      <label htmlFor='vehicle_mileage'></label>
                      <input
                        type='text'
                        name='vehicle_mileage'
                        id='vehicle_mileage'
                        value={vehicle_mileage}
                        onChange={(event) =>
                          setVehicleMileage(event.target.value)
                        }
                        placeholder='Vehicle mileage'
                        required
                      />
                    </div>

                    <div className='form-group col-md-12'>
                      <label htmlFor='vehicle_tag'></label>
                      <input
                        type='text'
                        name='vehicle_tag'
                        id='vehicle_tag'
                        value={vehicle_tag}
                        onChange={(event) => setVehicleTag(event.target.value)}
                        placeholder='Vehicle tag'
                        required
                      />
                    </div>

                    <div className='form-group col-md-12'>
                      <label htmlFor='vehicle_serial'></label>
                      <input
                        type='text'
                        name='vehicle_serial'
                        id='vehicle_serial'
                        value={vehicle_serial}
                        onChange={(event) =>
                          setVehicleSerial(event.target.value)
                        }
                        placeholder='Vehicle serial'
                        required
                      />
                    </div>

                    <div className='form-group col-md-12'>
                      <label htmlFor='vehicle_color'></label>
                      <input
                        type='text'
                        name='vehicle_color'
                        id='vehicle_color'
                        value={vehicle_color}
                        onChange={(event) =>
                          setVehicleColor(event.target.value)
                        }
                        placeholder='Vehicle color'
                        required
                      />
                    </div>

                    <div className='form-group col-md-12'>
                      <button
                        className='theme-btn btn-style-one'
                        type='submit'
                        data-loading-text='Please wait...'>
                        <span>
                          {renderType === "add"
                            ? "Add vehicle"
                            : "Edit vehicle"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AddEditVehicle;
