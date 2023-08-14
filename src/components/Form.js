import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Enter your full name"),
    email: yup.string().email().required("Enter correct email address"),
    age: yup.number().positive().integer().min(14).max(100).required("Age should be above 14"),
    password: yup.string().required("It should have atleast 6 characters").min(6).max(20),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords does not match"),
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Full Name:</label>
        <input type="text" placeholder="Full Name" {...register("fullName")} />
        <p>{errors.fullName?.message}</p>
        <br />
        <label>Email:</label>
        <input type="email" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>
        <br />
        <label>Age:</label>
        <input type="number" placeholder="Age" {...register("age")} />
        <p>{errors.age?.message}</p>
        <br />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>
        <br />
        <input className="submit_btn" type="submit" value={"Submit"} />
      </form>
    </div>
  );
};
