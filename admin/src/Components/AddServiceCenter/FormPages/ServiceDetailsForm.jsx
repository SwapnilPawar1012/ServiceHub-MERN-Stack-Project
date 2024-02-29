import React from "react";

export const ServiceDetailsForm = ({
  serviceCenterDetails,
  setNewService,
  saveButton,
  setServiceCenterDetails,
}) => {
  const handleEditInput = (index, updateValue) => {
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      servicesOffered: prevState.servicesOffered.map((item, id) => {
        if (id === index) {
          return updateValue;
        }
        return item;
      }),
    }));
  };

  const handleDeleteInput = (index) => {
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      servicesOffered: prevState.servicesOffered.filter(
        (_, id) => id !== index
      ),
    }));
  };

  const handleUpdateClick = (index) => {
    const updateValue = prompt(
      "Update '" + serviceCenterDetails.servicesOffered[index] + "' here"
    );
    if (updateValue !== "") {
      handleEditInput(index, updateValue);
    }
  };

  return (
    <div className="service-details-form">
      <h3>SERVICE OFFERED DETAILS</h3>
      <div className="add-service-center-itemfield">
        <p>Services Offered</p>
        <div className="add-service-center-inputfield">
          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => {
              setNewService(e.target.value);
            }}
          />
          <button className="btn btn-success fs-4" onClick={saveButton}>
            Save
          </button>
        </div>
      </div>

      <div className="add-service-center-itemfield">
        <p>List of Services</p>
        <ul>
          {serviceCenterDetails.servicesOffered.map((service, index) => (
            <li key={index}>
              <span>
                {index + 1} {")   "} {service}
              </span>

              <span className="edit-delete-btn">
                <button
                  className="btn btn-info fs-4"
                  onClick={(e) => {
                    handleUpdateClick(index);
                  }}
                >
                  Edit
                </button>
                <button
                  style={{ background: "red" }}
                  className="btn btn-danger fs-4"
                  onClick={(e) => {
                    handleDeleteInput(index);
                  }}
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
