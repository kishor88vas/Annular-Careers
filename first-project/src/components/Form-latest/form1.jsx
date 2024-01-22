import { useForm } from "react-hook-form";
import React from "react";
//import { FaCaretDown } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const MyForm1 = () => {
  let formdata = {
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    qualification: "",
    textarea: "",
    dynamicDropdown: "",
    staticDropdown: "",
    passedout: "",
    cctc: "",
    ectc: "",
    dropdown: "",
    upload: null,
  };

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    watch,
    reset,
    clearErrors,
    formState: { errors, isSubmitSuccessful, isSubmitError },
  } = useForm();

  const selectedValue = watch("staticDropdown");

  const validateContactNumber = (value) => {
    const isValidateContactNumber = /^\d{3}\d{3}\d{4}$/.test(value);

    if (!isValidateContactNumber) {
      setError("contactNumber", {
        type: "manual",
        message: "Please enter a valid 10-digit contact number.",
      });
    }
  };

  const validateEmail = (value) => {
    const isValidEmailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return (
      isValidEmailFormat.test(value) || "Please enter a valid email address."
    );
  };

  const options = [
    { label: "one", value: "Select" },
    { label: "two", value: "Java Developer" },
    { label: "three", value: "Spring Boot" },
    { label: "four", value: "React JS" },
    { label: "five", value: "Testing" },
  ];

  const maxSizeInBytes = 1024 * 1024; // 1MB

  const onFileChange = (event) => {
    const file = event.target.files[0];

    // Clear previous errors
    clearErrors("upload");

    // File size validation
    if (file && file.size > maxSizeInBytes) {
      setValue("upload", null);
      setError("upload", {
        type: "manual",
        message: "File size exceeds the maximum limit (1MB).",
      });
    } else {
      clearErrors("file");
      setValue("file", file);
    }
  };

  // const onSubmit = (e) => {
  //   //e.preventDefault();
  //   //const jsonData = JSON.stringify(e);
  //   console.log("Form data in JSON:", e);
  //   reset();
  // };

  //const apiEndpoint = "http://localhost:3000";
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  const onSubmit = async (e) => {
    console.log(e);
    try {
      const employeeData = {
        id: Math.floor(Math.random() * 1000), // Replace with a proper unique identifier
        firstName: e.firstName,
        middleName: e.middleName,
        lastName: e.lastName,
        phoneNo: e.contactNumber,
        email: e.email,
        educationalQual: e.qualification,
        keySkills: e.textarea,
        position: e.dynamicDropdown,
        experience: e.staticDropdown,
        passout: e.passedout,
        cctc: e.cctc,
        ectc: e.ectc,
        noticePeriod: e.dropdown,
        resume: e.upload[0]?.name || null,
      };

      const passedoutYear = parseInt(employeeData.passedout, 10);

      if (passedoutYear >= 2024) {
        setError("passedout", {
          type: "manual",
          message: "Year must be enter current or previous.",
        });
        return;
      }
      // Save the data to the mock database
      // You can replace this with actual API calls or database integration
      // For simplicity, I'm using a global variable as a mock database
      window.mockDatabase = window.mockDatabase || [];
      window.mockDatabase.push(employeeData);

      // Log the mock database for testing purposes
      console.log("Mock Database:", window.mockDatabase);

      // Reset the form after successful submission
      reset();
    } catch (error) {
      // Handle API request errors
      console.error("API Request Error:", error);

      // You can set an error message using setError if needed
      setError("apiError", {
        type: "manual",
        message: "Error submitting the form. Please try again.",
      });
    }
  };

  return (
    <div className="container w-75 p-3 shadow p-3 mt-5 mb-5 bg-body rounded">
      <h2 className="text-center my-4"> EMPLOYEE REGISTRATION FORM</h2>

      {/* Display success message */}
      {isSubmitSuccessful && (
        <div className="alert alert-success mt-3" role="alert">
          Form submitted successfully!
        </div>
      )}

      {/* Display error message */}
      {isSubmitError && (
        <div className="alert alert-danger mt-3" role="alert">
          Error submitting form. Please try again.
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="mt-5 form-control-sm"
      >
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>
              First Name <span className="text-danger">*</span>
            </label>
            <input
              {...register("firstName", {
                required: {
                  value: true,
                  message: "FirstName is required.",
                  maxLength: 30,
                },
              })}
              className="form-control"
              // onChange={handleChange}
              placeholder="First Name"
            />
            <p className="mt-2 text-danger">{errors.firstName?.message}</p>
          </div>

          <div className="col-md-4 mb-3">
            <label>Middle Name</label>
            <input
              {...register("middleName")}
              className="form-control"
              placeholder="Middle Name"
              //onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              {...register("lastName", {
                required: {
                  value: true,
                  message: "LastName is required",
                  maxLength: 30,
                },
              })}
              className="form-control"
              placeholder="Last Name"
              //onChange={handleChange}
            />
            <p className="mt-2 text-danger">{errors.lastName?.message}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-2">
            <label>
              Contact Number : <span className="text-danger">*</span>
            </label>
            <input
              {...register("contactNumber", {
                required: "Contact Number is required.",
                pattern: { value: /^\d+$/, message: "Enter Numbers only." },
              })}
              onBlur={(e) => validateContactNumber(e.target.value)}
              type="tel"
              minLength={10}
              maxLength={10}
              className="form-control"
              placeholder="Enter contact number"
              //onChange={handleChange}
            />
            <p className="mt-2 text-danger">{errors.contactNumber?.message}</p>
          </div>

          <div className="col-md-4 mb-3">
            <label>
              Email : <span className="text-danger">*</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                message: "Email ID is required.",
                validate: validateEmail,
              })}
              onBlur={(e) => validateEmail(e.target.value)}
              className="form-control"
              placeholder="Enter email"
              //onChange={handleChange}
            />
            <p className="mt-2 text-danger">{errors.email?.message}</p>
          </div>

          <div className="col-md-4 mb-3">
            <label>
              Educational Qualification <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              {...register("qualification", {
                required: {
                  value: true,
                  message: "Educational Qualification is required.",
                },
              })}
              className="form-control"
              placeholder="Educational Qualification"
              //onChange={handleChange}
            />
            <p className="mt-2 text-danger">{errors.qualification?.message}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-1">
            <label>
              Work Experience <span className="text-danger">*</span>
            </label>
            <select
              {...register("staticDropdown", {
                required: {
                  value: true,
                  message: "Years of experience is required.",
                },
              })}
              className="form-control"
              //onChange={handleChange}
            >
              <option value="0">Select</option>
              <option value="1">0 (Fresher)</option>
              <option value="2">0 - 1 Year</option>
              <option value="3">1 - 3 Year</option>
              <option value="4">3 - 5 Year</option>
              <option value="5">5 - 10 Year</option>
              <option value="6">Above 10 Years</option>
            </select>
            {/* <FaCaretDown style={iconStyle}/> */}

            <p className="mt-2 text-danger">{errors.staticDropdown?.message}</p>
          </div>

          <div className="col-md-6 mb-1">
            <label>Position Applied for</label>
            <select
              {...register("dynamicDropdown")}
              className="form-control"
              //onChange={handleChange}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
            {/* <FaCaretDown style={iconStyle}/> */}
          </div>
        </div>

        {(selectedValue !== "1" && (
          <>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>
                  CCTC <span className="text-danger">*</span>
                </label>
                <input
                  {...register("cctc", {
                    required: {
                      value: true,
                      message: "CCTC is required.",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter only numbers.",
                    },
                    minLength: {
                      value: 4,
                      message: "CCTC must be at least 4 digits.",
                    },
                  })}
                  className="form-control"
                  maxLength={8}
                  minLength={4}
                />
                <p className="mt-2 text-danger">{errors.cctc?.message}</p>
              </div>

              <div className="col-md-6 mb-3">
                <label>
                  ECTC <span className="text-danger">*</span>
                </label>
                <input
                  {...register("ectc", {
                    required: {
                      value: true,
                      message: "ECTC is required.",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter only numbers.",
                    },
                    minLength: {
                      value: 4,
                      message: "ECTC must be at least 4 digits.",
                    },
                  })}
                  className="form-control"
                  maxLength={8}
                  minLength={4}
                />
                <p className="mt-2 text-danger">{errors.ectc?.message}</p>
              </div>
            </div>
          </>
        )) || (
          <div className="col-md-6 mb-3">
            <label>
              Passed Out <span className="text-danger">*</span>
            </label>
            {/* <input
              {...register("passedout", {
                required: {
                  value: true,
                  message: "Passed out is required.",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter only numbers.",
                },
                validate: (value) =>
                  parseInt(value, 10) <= 2024 || "Year must be on or before 2024.",
              })}
              className="form-control"
              maxLength={4}
              minLength={4}
            /> */}
            <select
              {...register("passedout", {
                required: "Passed out is required.",
              })}
              className="form-control"
            >
              <option value="" disabled>
                Select year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {/* <p className="mt-2 text-danger">{errors.passedout?.message}</p> */}
            {errors.passedout && (
              <p className="mt-2 text-danger">{errors.passedout.message}</p>
            )}
          </div>
        )}

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Notice Period</label>
            <select
              {...register("dropdown")}
              className="form-control"
              //onChange={handleChange}
            >
              <option value="0">Select</option>
              <option value="1">15 Days</option>
              <option value="2">30 Days</option>
              <option value="3">45 Days</option>
              <option value="4">60 Days</option>
            </select>
            {/* <FaCaretDown style={iconStyle}/> */}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label>Key Skills</label>
            <textarea
              {...register("textarea")}
              className="form-control"
              //onChange={handleChange}
            />
          </div>
        </div>

        <div className="row justify-content-start align-items-center">
          <div className="col-md-4 mb-4 mt-2">
            <label className="form-label">
              Upload Resume(PDF or DOC) <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              {...register("upload", {
                required: {
                  value: true,
                  message: "File is required",
                },
              })}
              className="custom-file-input"
              accept=".pdf, .doc, .docx"
              onChange={onFileChange}
            />
            <p className="mt-2 text-danger">{errors.upload?.message}</p>
          </div>

          {errors.apiError && (
            <p className="text-danger h5">{errors.apiError.message}</p>
          )}

          <div className="col-md-4 mb-4 mt-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyForm1;
