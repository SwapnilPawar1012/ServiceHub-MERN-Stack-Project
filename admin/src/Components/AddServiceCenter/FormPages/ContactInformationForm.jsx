import React from "react";

export const ContactInformationForm = ({
  serviceCenterDetails,
  setServiceCenterDetails,
  saveContactButton,
  setContactNumbers,
}) => {
  const handleEditInput = (index, updateValue) => {
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        phone: prevState.contact.phone.map((item, id) => {
          if (id === index) {
            return updateValue;
          }
          return item;
        }),
      },
    }));
  };

  const handleUpdateClick = (index) => {
    const updateValue = prompt(
      "Update '" + serviceCenterDetails.contact.phone[index] + "' here"
    );
    if (updateValue !== "") {
      handleEditInput(index, updateValue);
    }
  };

  const handleDeleteInput = (index) => {
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        phone: prevState.contact.phone.filter((_, id) => id !== index),
      },
    }));
  };

  const HandleAddContactInfo = (e) => {
    const { name, value } = e.target;
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [name]: value,
      },
    }));
  };

  return (
    <div className="contact-info-form">
      <h3>CONTACT DETAILS</h3>
      <div className="add-service-center-itemfield">
        <p>Phone</p>
        <div className="add-service-center-inputfield">
          <input
            type="tel"
            name="phone"
            placeholder="Type here"
            pattern="[7-9]{1}[0-9]{9}"
            maxLength="10"
            onChange={(e) => setContactNumbers(e.target.value)}
          />
          <button className="btn btn-success fs-4" onClick={saveContactButton}>
            Save
          </button>
        </div>
      </div>

      <div className="add-service-center-itemfield">
        <p>List of Services</p>
        <ul>
          {serviceCenterDetails.contact.phone.map((number, index) => (
            <li key={index}>
              <span>
                {index + 1} {")   "} {number}
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

      <div className="add-service-center-itemfield">
        <p>E-mail</p>
        <input
          value={serviceCenterDetails.contact.email}
          onChange={(e) => HandleAddContactInfo(e)}
          type="email"
          name="email"
          placeholder="Type here"
        />
      </div>

      <div className="add-service-center-itemfield">
        <p>Website URL (optional)</p>
        <input
          value={serviceCenterDetails.contact.website}
          onChange={(e) => HandleAddContactInfo(e)}
          type="url"
          name="website"
          placeholder="Type here"
        />
      </div>
    </div>
  );
};
