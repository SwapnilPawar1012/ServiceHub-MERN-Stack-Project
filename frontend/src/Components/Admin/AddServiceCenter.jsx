import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BasicInfoForm } from "./FormPages/BasicInfoForm";
import { LocationDetailsForm } from "./FormPages/LocationDetailsForm";
import { ServiceDetailsForm } from "./FormPages/ServiceDetailsForm";
import { OperationalInformationForm } from "./FormPages/OperationalInformationForm";
import { ContactInformationForm } from "./FormPages/ContactInformationForm";
import { DiscountsDetailsForm } from "./FormPages/DiscountsDetailsForm";
import { Sidebar } from "../Admin/Sidebar";
import { useNavigate } from "react-router-dom";

export const AddServiceCenter = () => {
  const { navigate } = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [serviceCenterDetails, setServiceCenterDetails] = useState({
    userId: "",
    name: "",
    description: "",
    category: "",
    image: "", // Assuming a default or placeholder image path or URL
    address: "",
    location: {
      latitude: "",
      longitude: "",
    },
    servicesOffered: [], // Initialize as an empty array; specific services can be added later
    operatingHours: {
      workingDays: {
        days: "", // monday - friday
        hours: "", // 08:00 AM - 08:00 PM
      },
      nonWorkingDays: {
        days: "", // saturday - sunday
      },
    },
    contact: {
      phone: [], // Initialize as an empty array to hold multiple phone numbers
      email: "",
      website: "",
    },
    ratings: 0, // Assuming a default rating of 0
    reviews: [], // Initialize as an empty array; reviews can be added later
    verificationStatus: "Pending", // Assuming a default verification status; adjust as necessary
    discounts: [], // Initialize as an empty array; specific discounts can be added later
  });

  // Method to send data to backend
  const AddServiceCenterDetails = async () => {
    let responseData;
    let serviceCenter = serviceCenterDetails;

    let formData = new FormData();
    formData.append("service-center", image);

    console.log("Uploading image...");
    try {
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadResponse.ok)
        throw new Error("Image upload failed: " + uploadResponse.statusText);
      responseData = await uploadResponse.json();

      if (responseData.success) {
        serviceCenter.image = responseData.image_url;

        // const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
        const token = localStorage.getItem("auth-token");
        // console.log("Token:", token); // Add this to debug

        const response = await fetch("http://localhost:4000/addservicecenter", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": token, // Send the token here
          },
          body: JSON.stringify(serviceCenter),
        });
        const data = await response.json();
        if (data.success) {
          alert("Service Center Added");
          navigate("/admin");
        } else {
          alert("Failed to add service center");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload data");
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const saveButton = () => {
    let decoded;
    const token = localStorage.getItem("auth-token");
    console.log("token name : " + token);
    if (token) {
      decoded = jwtDecode(token);
      console.log(decoded.user._id); // { sub: "1234567890", name: "John Doe", iat: 1516239022, ... }
    }
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      userId: decoded.user._id,
    }));
    handleAddServicesOffered();
  };

  const saveContactButton = () => {
    AddContactNumbers();
  };

  const nextSavePage = () => {
    handleAddOperatingHours();
    setTimeout(() => {
      setCurrentPage(currentPage + 1);
    }, 500);
  };

  const prevPage = () => setCurrentPage(currentPage - 1);

  const [image, setImage] = useState(false);
  console.log(image);

  // Handle changes for simple fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes for nested fields
  const handleNestedInputChange = (e) => {
    const { name, value } = e.target;
    const field = name.split(".")[1]; // get the specific field in location
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [field]: value,
      },
    }));
  };

  //********* Service Offered *********/
  const [newService, setNewService] = useState(""); // For adding new services
  const handleAddServicesOffered = () => {
    if (newService.trim() === "") {
      return;
    }
    setServiceCenterDetails((prevState) => ({
      ...prevState,
      servicesOffered: [...prevState.servicesOffered, newService],
    }));
  };

  //********* Add Operating Hours *********/
  const [openDays, setOpenDays] = useState({
    from: "monday",
    to: "friday",
  });

  const [closeDays, setCloseDays] = useState({
    from: "saturday",
    to: "sunday",
  });

  const [operatingHours, setOperatingHours] = useState({
    startTimePeriod: "", // 9:00 AM
    endTimePeriod: "", //5:00 PM
  });

  const handleAddOperatingHours = () => {
    const openDaysValue = openDays.from + " - " + openDays.to;
    const closeDaysValue = closeDays.from + " - " + closeDays.to;
    const openHoursValue =
      operatingHours.startTimePeriod + " - " + operatingHours.endTimePeriod;
    if (
      operatingHours.startTimePeriod.trim() === "" ||
      operatingHours.endTimePeriod.trim() === ""
    ) {
      alert("Please Select Operating Hours Correctly.");
      setTimeout(() => {
        setCurrentPage(currentPage);
      }, 2000);
      return;
    } else {
      setServiceCenterDetails({
        ...serviceCenterDetails,
        operatingHours: {
          ...serviceCenterDetails.operatingHours,
          workingDays: {
            ...serviceCenterDetails.operatingHours.workingDays,
            days: openDaysValue,
            hours: openHoursValue,
          },
          nonWorkingDays: {
            ...serviceCenterDetails.operatingHours.nonWorkingDays,
            days: closeDaysValue,
          },
        },
      });
    }
    console.log("saved");
  };

  //********* Add Contact Numbers *********/
  const [contactNumbers, setContactNumbers] = useState("");
  const AddContactNumbers = () => {
    console.log("AddContactNumbers contact number " + contactNumbers);
    if (contactNumbers.trim() === "") {
      console.log("returned");
      return;
    }
    let num = 0;
    serviceCenterDetails.contact.phone.map((item, id) => {
      num = item;
    });
    if (num === contactNumbers) {
      alert("Contact number already added.");
    } else {
      setServiceCenterDetails((prevState) => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          phone: [...prevState.contact.phone, contactNumbers],
        },
      }));
    }
  };

  //********* Form Pages *********/
  const pageDisplay = () => {
    switch (currentPage) {
      case 1:
        return (
          <BasicInfoForm
            onNext={nextPage}
            serviceCenterDetails={serviceCenterDetails}
            image={image}
            setImage={setImage}
            handleInputChange={handleInputChange}
          />
        );
        break;

      case 2:
        return (
          <LocationDetailsForm
            onNext={nextPage}
            serviceCenterDetails={serviceCenterDetails}
            setServiceCenterDetails={setServiceCenterDetails}
            handleInputChange={handleInputChange}
            handleNestedInputChange={handleNestedInputChange}
          />
        );
        break;

      case 3:
        return (
          <ServiceDetailsForm
            onNext={nextPage}
            serviceCenterDetails={serviceCenterDetails}
            setNewService={setNewService}
            saveButton={saveButton}
            setServiceCenterDetails={setServiceCenterDetails}
          />
        );
        break;

      case 4:
        return (
          <OperationalInformationForm
            onNext={nextSavePage}
            openDays={openDays}
            setOpenDays={setOpenDays}
            closeDays={closeDays}
            setCloseDays={setCloseDays}
            operatingHours={operatingHours}
            setOperatingHours={setOperatingHours}
          />
        );
        break;

      case 5:
        return (
          <ContactInformationForm
            onNext={nextPage}
            serviceCenterDetails={serviceCenterDetails}
            setServiceCenterDetails={setServiceCenterDetails}
            saveContactButton={saveContactButton}
            contactNumbers={contactNumbers}
            setContactNumbers={setContactNumbers}
          />
        );
        break;

      case 6:
        return (
          <DiscountsDetailsForm
            // onNext={nextPage}
            serviceCenterDetails={serviceCenterDetails}
            setServiceCenterDetails={setServiceCenterDetails}
          />
        );
        break;

      default:
        // <div>Form Completed. Thank you!</div>;
        // alert("Service Center Added Successfully.");
        break;
    }
  };

  return (
    <div className="admin">
      <Sidebar />
      <div className="add-service-center">
        {pageDisplay()}
        <div>
          {currentPage === 1 && (
            <div className="add-service-center-btns1">
              <></>
              <button className="btn btn-primary fs-4" onClick={nextPage}>
                Next
              </button>
            </div>
          )}
          {currentPage > 1 && currentPage < 6 && (
            <div className="add-service-center-btns">
              <button className="btn btn-secondary fs-4" onClick={prevPage}>
                Previous
              </button>
              {(currentPage === 4 && (
                <button className="btn btn-primary fs-4" onClick={nextSavePage}>
                  Next
                </button>
              )) || (
                <button className="btn btn-primary fs-4" onClick={nextPage}>
                  Next
                </button>
              )}
            </div>
          )}
          {currentPage === 6 && (
            <div className="add-service-center-btns">
              <button className="btn btn-secondary fs-4" onClick={prevPage}>
                Previous
              </button>
              <button
                className="btn btn-primary fs-4"
                onClick={() => {
                  AddServiceCenterDetails();
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
