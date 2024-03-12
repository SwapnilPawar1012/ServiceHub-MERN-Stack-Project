import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DiscountsDetailsForm = ({
  serviceCenterDetails,
  setServiceCenterDetails,
}) => {
  const handleDeleteInput = (index) => {
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      discounts: prevState.discounts.filter((_, id) => id !== index),
    }));
  };

  // Initialize discountFields as an object since it holds details for a single discount.
  const [discountFields, setDiscountFields] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Calculate 3 months from today
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  const handleStartDate = (date) => {
    setStartDate(date);
    updateValidityDate("startDate", date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    updateValidityDate("endDate", date);
  };

  const updateValidityDate = (field, date) => {
    const formattedDate = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

    setDiscountFields((prevState) => ({
      ...prevState,
      validity: {
        ...prevState.validity,
        [field]: formattedDate,
      },
    }));
  };

  const handleDiscountForm = (e) => {
    const { name, value } = e.target;

    setDiscountFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveDiscountDetailsButton = () => {
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      discounts: [...(prevState.discounts || []), discountFields],
    }));
    // Reset discountFields for a new entry
    setDiscountFields({});
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <div className="discount-details-form">
      <h3>
        DISCOUNT DETAILS
        <span style={{ color: "red", fontSize: "18px" }}> (Optional)</span>
      </h3>
      <div className="add-service-center-itemfield">
        <p>Discount Name</p>
        <input
          // value={serviceCenterDetails.discountName}
          onChange={handleDiscountForm}
          type="text"
          name="discountName"
          placeholder="Type here"
          maxLength="30"
          required
        />
      </div>
      <div className="add-service-center-itemfield">
        <p>Description</p>
        <textarea
          // value={serviceCenterDetails.discountDescription}
          onChange={handleDiscountForm}
          type="text"
          name="discountDescription"
          placeholder="Type here"
        />
      </div>
      <div className="add-service-center-itemfield">
        <p>Percentage OFF</p>
        <input
          // value={serviceCenterDetails.percentageOff}
          onChange={handleDiscountForm}
          type="number"
          name="percentageOff"
          placeholder="Type here"
          min="1"
          max="100"
          required
        />
      </div>
      <div className="add-service-center-itemfield">
        <p>Conditions</p>
        <textarea
          // value={serviceCenterDetails.conditions}
          onChange={handleDiscountForm}
          type="text"
          name="conditions"
          placeholder="Type here"
        />
      </div>
      <div className="add-service-center-date-picker">
        <div className="add-service-center-itemfield">
          <p>Start Date</p>
          <DatePicker
            selected={startDate}
            minDate={new Date()}
            name="startDate"
            value={serviceCenterDetails.startDate}
            onChange={(date) => handleStartDate(date)}
            required
          />
        </div>
        <div className="add-service-center-itemfield">
          <p>End Date</p>
          <DatePicker
            selected={endDate}
            minDate={new Date()}
            name="endDate"
            maxDate={threeMonthsFromNow} // 3 months from today
            value={serviceCenterDetails.endDate}
            onChange={(date) => handleEndDate(date)}
            required
          />
        </div>
      </div>
      <div className="add-service-center-itemfield">
        <div className="add-service-center-itemfield-save-btn">
          <button
            className="btn btn-success fs-4"
            onClick={saveDiscountDetailsButton}
          >
            Save
          </button>
        </div>
      </div>

      <div className="add-service-center-itemfield">
        <p>List of Discounts</p>
        <ul>
          {serviceCenterDetails.discounts?.map((item, index) => (
            <li key={index}>
              <div>
                <p>Discount No : {index + 1}</p>
                <p>Discount Name : {item.discountName}</p>
                <p>Percentage OFF : {item.percentageOff}%</p>
                <p>
                  Valid : {" From   "}
                  {item.validity?.startDate} {"   To   "}
                  {item.validity?.endDate}
                </p>
                <p>Description : {item.discountDescription}</p>
                <p>Conditions : {item.conditions}%</p>
              </div>
              <div>
                <span className="edit-delete-btn">
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
