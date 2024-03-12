import React from "react";

export const OperationalInformationForm = ({
  openDays,
  setOpenDays,
  closeDays,
  setCloseDays,
  operatingHours,
  setOperatingHours,
}) => {
  // Handle changes to operating hours
  const handleTimeChange = (e, field) => {
    const { name, value } = e.target;
    // console.log(name);
    let newValue = value; // The time in 24-hour format (HH:mm)

    // Convert 24-hour time to 12-hour format
    const [hours, minutes] = newValue.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Converts "0" hours to "12"

    // Format the hours and minutes for consistent 2-digit format if needed
    const formattedTime = `${hours12.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    setOperatingHours({ ...operatingHours, [name]: formattedTime });
  };

  // Handle changes to day selections
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newName = name.split(".");
    if (newName[0] === "openDays") {
      setOpenDays((prev) => ({
        ...prev,
        [newName[1]]: value,
      }));
    } else if (newName[0] === "closeDays") {
      setCloseDays((prev) => ({
        ...prev,
        [newName[1]]: value,
      }));
    }
  };

  return (
    <div className="operational-info-form">
      <h3>OPERATIONAL DETAILS</h3>
      <div className="add-service-center-operating-hour">
        <h4>
          OPEN ON
          <span> (Choose Working Days)</span>
        </h4>

        {/* For Working Days */}
        <div className="add-service-center-operating-hours">
          <div className="add-service-center-itemfield">
            <p> From </p>
            <select
              onChange={handleInputChange}
              name="openDays.from" // Use the same property name as in the state
              value={openDays.from} // Control the component with state
              className="add-service-center-selector"
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          <div className="add-service-center-itemfield">
            <p> To </p>
            <select
              onChange={handleInputChange}
              name="openDays.to" // Use the same property name as in the state
              value={openDays.to} // Control the component with state
              className="add-service-center-selector"
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
        </div>

        {/* For Time */}
        <div className="add-service-center-operating-hours">
          <div className="add-service-center-itemfield">
            <p>Start Time</p>
            <input
              value={operatingHours.startTime}
              onChange={(e) => handleTimeChange(e, "startTime")}
              type="time"
              name="startTimePeriod"
            />
          </div>
          <div className="add-service-center-itemfield">
            <p>Close Time</p>
            <input
              value={operatingHours.endTime}
              onChange={(e) => handleTimeChange(e, "endTime")}
              type="time"
              name="endTimePeriod"
            />
          </div>
        </div>
      </div>

      {/* For Non Working Days */}
      <div className="add-service-center-operating-hour">
        <h4>
          CLOSED ON <span> (Choose Non Working Days)</span>
        </h4>
        <div className="add-service-center-operating-hours">
          <div className="add-service-center-itemfield">
            <p> From </p>
            <select
              onChange={handleInputChange}
              name="closeDays.from" // Use the same property name as in the state
              value={closeDays.from} // Control the component with state
              className="add-service-center-selector"
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          <div className="add-service-center-itemfield">
            <p> To </p>
            <select
              onChange={handleInputChange}
              name="closeDays.to" // Use the same property name as in the state
              value={closeDays.to} // Control the component with state
              className="add-service-center-selector"
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
