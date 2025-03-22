import * as Yup from "yup";

export const registerSchema = Yup.object({
  school_name: Yup.string()
    .min(8, "School name must be at least 8 characters")
    .required("School name is required"),
  
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  owner_name: Yup.string()
    .min(3, "Owner name must be at least 3 characters")
    .required("Owner name is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),

  school_image: Yup.mixed()
    .required("School image is required"),
});
