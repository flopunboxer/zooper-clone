"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { initialValues } from "@/formik/initialValues";
import { Emptyschema, validationSchemas } from "@/formik/validationSchema";
import Swal from "sweetalert2";
import Consentform from "@/components/consentForm";
import SignaturePad from "react-signature-canvas";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/loader";
import WaiverForm from "@/components/waiverForm";

function FormPage() {
  const router = useRouter();
  const [isLoading,setIsLoading]=useState(false)
  const [step, setStep] = useState(0);
  const [sigPad, setSigPad] = useState({});
  const [formData, setFormData] = useState({});
  const [isChild, setisChild] = useState(false);
  const [childData, setChildData] = useState([
    {
      name: "",
      gender: "male",
      birth_year: "",
      birth_month: "",
      birth_day: "",
    },
  ]);
  const [isParentChecked, setIsParentChecked] = useState(false);
  const [isAdultChecked, setIsAdultChecked] = useState(false);
  const [showWaiverForm,setShowWaiverForm]=useState(false)
  const [waiverFormData,setWaiverFormData]=useState(null)
  const handleParentChange = (event) => {
    setIsParentChecked(event.target.checked);
  };

  const handleAdultChange = (event) => {
    setIsAdultChecked(event.target.checked);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: step <= 5 ? validationSchemas[step] : Emptyschema,
    onSubmit: async (values) => {
      // Handle each step's submission logic
      console.log(values, "here");
      if (step === 0) {
        setFormData({ ...formData, email: values.email });
        setIsLoading(true)
        const result = await checkIfUserExistAlready({ email: values.email });
        setIsLoading(false)
        if (result.exists) {
          setWaiverFormData(result.data)
          setShowWaiverForm(true)
          setStep('waiver')
          // console.log("user already regisetred");
          // Swal.fire({
          //   icon: "error",
          //   text: "This email already registered with us",
          // });
          

        } else {
          setStep(1);
        }
      } else if (step === 1) {
        setFormData({ ...formData, name: values.name });
        setStep(2);
      } else if (step === 2) {
        setFormData({ ...formData, phone: values.phone });
        setStep(3);
      } else if (step === 3) {
        setFormData({ ...formData, gender: values.gender });
        setStep(4);
      } else if (step === 4) {
        setFormData({ ...formData, city: values.city });

        setStep(5);
      } else if (step === 5) {
        setFormData({ ...formData, age: values.age });

        setStep(6);
      } else if (step === 8) {
        if (isAdultChecked && isParentChecked) {
          setStep(9);
        } else {
          Swal.fire({
            icon: "error",
            text: "Fill accept both consents",
          });
        }
      }
    },
  });
  function isChildDataComplete(childData) {
    return childData.every((child) =>
      Object.values(child).every((value) => value !== "")
    );
  }
  const handleSignatureEnd = () => {
    if (sigPad) {
      const signatureData = sigPad.getTrimmedCanvas().toDataURL("image/png");
      setFormData((prev) => ({
        ...prev,
        signature: signatureData,
      }));
    }
  };

  const clearSignature = () => {
    if (sigPad) {
      sigPad.clear();
      setFormData((prev) => ({
        ...prev,
        signature: null,
      }));
    }
  };
  const FinalSubmitFunction = async () => {
    console.log(formData);
    if (!formData?.signature) {
      Swal.fire({
        icon: "error",
        text: "Please do your signatures",
      });
    } else {
      console.log(
        { ...formData, children: childData },
        "this is final form data"
      );
      try {
        setIsLoading(true)
        const res = await fetch("/api/submitForm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isChild ? { ...formData, children: childData } : formData
          ),
        });
        
        const result = await res.json();
        setIsLoading(false)
        console.log(result);
        if (result.code == 200) {
          Swal.fire({
            title: "Success!",
            text: "You have successfully signed your waiver. You may directly proceed to the ticket counter. This will be valid for next 1 year.",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Something went wrong.",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/");
            }
          });
        }
      } catch (err) {
        setIsLoading(false)
        Swal.fire({
          icon: "error",
          text: "Something went wrong.",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/");
          }
        });
      }
    }
  };

  const checkIfUserExistAlready = async (data) => {
    try {
      const res = await fetch("/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      return result;
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Something went wrong.",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      {isLoading && <Loader></Loader>}
      {step === 0 && (
        <div className="field-box">
          <h2 className="field-box-heading">
            What is your email address? <span className="asterik">*</span>
          </h2>
          <div className="field-box-pair">
            <input
              className="input-field"
              type="text"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <button className="next-btn" type="submit">
              <Image
                src="/right-arrow.svg"
                alt="Next"
                width={30}
                height={30}
                priority
              />
            </button>
          </div>

          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
      )}
      {step === 1 && (
        <div className="field-box">
          <button
            className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          
          <h2 className="field-box-heading">
            Step 2: Enter Your Name <span className="asterik">*</span>
          </h2>
          <div className="field-box-pair">
            <input
              className="input-field"
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />

            <button className="next-btn" type="submit">
              <Image
                src="/right-arrow.svg"
                alt="Next"
                width={30}
                height={30}
                priority
              />
            </button>
          </div>

          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
      )}
      {step === 2 && (
        <div className="field-box">
          <button
            className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <h2 className="field-box-heading">
            Step 3: Enter Your Phone Number <span className="asterik">*</span>
          </h2>
          <div className="field-box-pair">
            <input
              className="input-field"
              type="text"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <button type="submit" className="next-btn">
              {" "}
              <Image
                src="/right-arrow.svg"
                alt="Next"
                width={30}
                height={30}
                priority
              />
            </button>
          </div>

          {formik.touched.phone && formik.errors.phone && (
            <div className="error">{formik.errors.phone}</div>
          )}
        </div>
      )}
      {step === 3 && (
        <div className="field-box">
          <button
            className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <h2 className="field-box-heading">
            Step 4: Select Your Gender <span className="asterik">*</span>
          </h2>
          <div className="field-box-pair">
            <select
              className="input-field"
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="not-specified">Not specified</option>
            </select>
            <button className="next-btn" type="submit">
              {" "}
              <Image
                src="/right-arrow.svg"
                alt="Next"
                width={30}
                height={30}
                priority
              />
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="field-box">
          <button
            className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <h2 className="field-box-heading">
            Step 5: Enter Your City <span className="asterik">*</span>
          </h2>
          <div className="field-box-pair">
            <input
              className="input-field"
              type="text"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />

            <button className="next-btn" type="submit">
              {" "}
              <Image
                src="/right-arrow.svg"
                alt="Next"
                width={30}
                height={30}
                priority
              />
            </button>
          </div>

          {formik.touched.city && formik.errors.city && (
            <div className="error">{formik.errors.city}</div>
          )}
        </div>
      )}
      {step === 5 && (
        <div className="field-box">
          <button
            className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <h2 className="field-box-heading">
            Step 6: Enter Your Age <span className="asterik">*</span>
          </h2>
          <div className="field-box-pair">
            {" "}
            <select
              className="input-field"
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
              required
            >
              <option value="" label="Select your age" />
              {[...Array(63)].map((_, index) => (
                <option key={index + 18} value={index + 18}>
                  {index + 18}
                </option>
              ))}
            </select>
            <button className="next-btn" type="submit">
              <Image
                src="/right-arrow.svg"
                alt="Next"
                width={30}
                height={30}
                priority
              />
            </button>
          </div>

          {formik.touched.age && formik.errors.age && (
            <div className="error">{formik.errors.age}</div>
          )}
        </div>
      )}
      {step === 6 && (
        <div className="field-box">
          <button
            className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <h2 className="field-box-heading !text-[30px]">Add a Child?</h2>
          <div className=" flex gap-x-3 mt-5">
            <button
              className="big-btns"
              onClick={() => {
                setisChild(true);
                setStep(7);
              }}
            >
              Yes
            </button>
            <button
              className="big-btns"
              onClick={() => {
                setisChild(false);
                setStep(8);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
      {step === 7 && (
        <div>
          <button
            className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
            <div className=" flex gap-x-2"><button 
          className="big-btns !w-[240px]"
            onClick={() => {
              setChildData([
                ...childData,
                {
                  name: "",
                  gender: "male",
                  birth_year: "",
                  birth_month: "",
                  birth_day: "",
                },
              ]);
            }}
          >
            Add New Child
          </button>
        
          <button
            className="next-btn !rounded-md"
            type="submit"
            onClick={() => {
              console.log("Children data:", childData);
              if (!isChildDataComplete(childData)) {
                Swal.fire({
                  icon: "error",
                  text: "Fill all the fields",
                });
              } else {
                setStep(8);
              }
            }}
          >
            <Image
              src="/right-arrow.svg"
              alt="Next"
              width={30}
              height={30}
              priority
            />
          </button></div>
          

          <div className="child-table">
            <div className="child-row header flex w-full !bg-[#11085a] text-[23px] ">
              <div className=" w-[30%] border-white border-x-2 h-full !text-white flex items-center px-2" >Name <span className="asterik">*</span></div>
              <div  className=" w-[20%] border-white border-x-2  h-full !text-white flex items-center px-2">Gender <span className="asterik">*</span></div>
              <div  className=" w-[30%] border-white border-x-2  h-full !text-white flex items-center px-2">Birth Date <span className="asterik">*</span></div>
              <div  className=" w-[20%] border-white border-x-2  h-full !text-white flex items-center px-2">Delete <span className="asterik">*</span></div>
            </div>
            {childData.map((child, index) => (
              <div className="child-row" key={index}>
                <input
                 className="input-field !w-[28%]"
                  type="text"
                  placeholder="Name"
                  value={child.name}
                  onChange={(e) => {
                    const updatedData = [...childData];
                    updatedData[index].name = e.target.value;
                    setChildData(updatedData);
                  }}
                />
                <select
                className="input-field !w-[20%]"
                  value={child.gender}
                  onChange={(e) => {
                    const updatedData = [...childData];
                    updatedData[index].gender = e.target.value;
                    setChildData(updatedData);
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="not-specified">Not Specified</option>
                </select>
                <div className="birth-date ">
                  <select
                    className="input-field !w-[100px]"
                    value={child.birth_year}
                    onChange={(e) => {
                      const updatedData = [...childData];
                      updatedData[index].birth_year = e.target.value;
                      setChildData(updatedData);
                    }}
                  >
                    <option value="" label="Year" />
                    {[...Array(63)].map((_, year) => (
                      <option key={year} value={year + 1960}>
                        {year + 1960}
                      </option>
                    ))}
                  </select>
                  <select
                  className="input-field !w-[120px]"
                    value={child.birth_month}
                    onChange={(e) => {
                      const updatedData = [...childData];
                      updatedData[index].birth_month = e.target.value;
                      setChildData(updatedData);
                    }}
                  >
                    <option value="" label="Month" />
                    {[...Array(12)].map((_, month) => (
                      <option key={month} value={month + 1}>
                        {month + 1}
                      </option>
                    ))}
                  </select>
                  <select
                  className="input-field !w-[100px]"
                    value={child.birth_day}
                    onChange={(e) => {
                      const updatedData = [...childData];
                      updatedData[index].birth_day = e.target.value;
                      setChildData(updatedData);
                    }}
                  >
                    <option value="" label="Day" />
                    {[...Array(31)].map((_, day) => (
                      <option key={day} value={day + 1}>
                        {day + 1}
                      </option>
                    ))}
                  </select>
                </div>
                {
                  index!=0 &&  <div className=" ml-10">
                  <button
                  onClick={() => {
                    const updatedData = childData.filter((_, i) => i !== index);
                    setChildData(updatedData);
                  }}
                >
                  <Image
                src="/delete-icon.svg"
                alt="Next"
                width={25}
                height={25}
                priority
              />
                </button></div>
                }
               
                
              </div>
            ))}
          </div>

          
        </div>
      )}
      {step == 8 && (
        <div className=" flex flex-col items-center ">
          <div className="flex justify-center ">
            <button
              className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
              onClick={() => {
                setStep((prev) => {
                  if (isChild) {
                    return prev - 1;
                  } else {
                    return prev - 2;
                  }
                });
              }}
            >
              Back
            </button>
            <div className=" flex flex-col gap-y-3">
              <Consentform></Consentform>
              <div className=" flex flex-col">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    width: "800px",
                  }}
                >
                  <input
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    id="parentCheckbox"
                    checked={isParentChecked}
                    onChange={handleParentChange}
                  />
                  <label
                    htmlFor="parentCheckbox"
                    style={{ marginLeft: "8px", fontWeight: "500" }}
                  >
                    <span className="asterik">*</span>I certify that I am the
                    parent or legal guardian of the above child and confirm that
                    the information I entered is accurate and true.
                  </label>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    id="adultCheckbox"
                    checked={isAdultChecked}
                    onChange={handleAdultChange}
                  />
                  <label
                    htmlFor="adultCheckbox"
                    style={{ marginLeft: "8px", fontWeight: "500" }}
                  >
                    <span className="asterik">*</span>I am at least 18 years old
                    and I have read and agree to the terms of the above
                    agreement.
                  </label>
                </div>
              </div>
            </div>
            <button className="next-btn !h-12 !w-32 !rounded-md !ml-5">
              <Image
                src="/right-arrow.svg"
                alt="Next"
                width={30}
                height={30}
                priority
              />
            </button>
          </div>
        </div>
      )}
      {step == 9 && (
        <div className="field-box">
          {" "}
          <button
            className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <div
            onClick={clearSignature}
            className="w-[75px] text-center bg-white text-black  py-1 px-2 rounded cursor-pointer"
          >
            Clear
          </div>
          <div className="space-y-4">
            <div className="border rounded bg-white border-2 border-black w-[630px]">
              <SignaturePad
                ref={(ref) => setSigPad(ref)}
                canvasProps={{
                  className: "signature-pad",
                  width: 600, // Set specific width
                  height: 250, // Set specific height
                  style: {
                    border: "none",
                    backgroundColor: "white", // Light blue background
                    borderRadius: "0.5rem",
                  },
                }}
                penColor="#337ab7"
                onEnd={handleSignatureEnd}
                velocityFilterWeight={100} // Smooth out signatures
                minWidth={1} // Minimum line width
                maxWidth={2.5} // Maximum line width
                dotSize={1.5}
              />
            </div>
          </div>
          <div
            onClick={FinalSubmitFunction}
            className="w-[100px] py-1 px-3 flex justify-center items-center text-center bg-[#337ab7] text-white rounded text-[22px] cursor-pointer"
          >
            Submit
          </div>
        </div>
      )}
      {
        step=='waiver' &&<>
        <button
              className=" absolute right-[50px] top-0 mt-2 ml-5 mb-2 bg-white rounded-md py-1 px-7 text-[20px]"
              onClick={() => {
               setStep(0)
              }}
            >
              Back
            </button>
            <WaiverForm data={waiverFormData}></WaiverForm>
        </> 
      }
    </form>
  );
}

export default FormPage;
