import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/Input";
import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import accountApis from "../../apis/authApis";
import path from "../../constants/path";


interface FormValues {
  email: string;
}

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .max(255)
      .required("Vui lòng nhập email")
      .matches(
        /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/,
        "Email không đúng định dạng"
      )
      .trim(),
  })
  .required();


export default function ForgotPassword() {
    const [loading, setLoading] = useState<boolean>();
    const navigate = useNavigate();
     const {
       handleSubmit,
       control,
       formState: { errors },
     } = useForm<FormValues>({
         resolver: yupResolver(schema), defaultValues: {
        email: ''
    }});

    const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
      console.log("login", values);
      setLoading(true);
      accountApis
        .forgot_password({
          email: values.email,
        })
          .then(function (data) {
              console.log(data)
              navigate(path.login)
          // storage.setToken(STORAGE_KEY.TOKEN, token);
          // storage.setUser(STORAGE_KEY.INFO, JSON.stringify(user));
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          // errorHelper(err);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  return (
    <div className="bg-orange">
      <div className="layout">
        <div className="grid grid-cols-5 py-32 pr-10 max-sm:grid-cols-1 max-sm:py-12 max-sm:pr-0 bg-tr">
          <div className="col-span-2 col-start-4 max-sm:col-span-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-10 rounded bg-white shadow-sm"
              noValidate
            >
              <div className="text-2xl">Vui lòng nhập email</div>
               <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="mt-4"
                    errorMessage={errors.email?.message}
                    autoComplete="off"
                  />
                )}
              />
              <div className="mt-1">
                <Button
                  className="w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center gap-2"
                  isLoading={loading}
                  disabled={loading}
                >
                  Rest password
                </Button>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-gray-400 ">Bạn mới biết đến Shopee?</span>
                <Link to="/login" className="text-red-400 ml-1">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
