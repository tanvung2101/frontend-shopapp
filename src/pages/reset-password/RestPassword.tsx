import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/Input";
import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import accountApis from "../../apis/authApis";

interface FormValues {
  password: string;
  confirmPass: string;
}

const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(30, "Mật khẩu không được quá 30 ký tự")
      .trim(),

    confirmPass: yup
      .string()
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
      .required("Vui lòng nhập lại mật khẩu")
      .trim(),
  })
  .required();

export default function ResetPassword() {
  const [loading, setLoading] = useState<boolean>();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
        password: "",
        confirmPass: '',
    },
  });
const [searchParams] = useSearchParams();
const token = searchParams.get("token"); // Lấy giá trị token

console.log("Token:", token);

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    console.log("login", values);
    setLoading(true);
    accountApis
      .reset_password({
          password: values.password,
          forgot_password_token: token as string
      })
      .then(function (data) {
        console.log(data);
        navigate("/login");
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
              <div className="text-2xl">Vui lòng nhập password</div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="mt-4"
                    errorMessage={errors.password?.message}
                    autoComplete="off"
                  />
                )}
              />
              <Controller
                name="confirmPass"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm Password"
                    className="mt-2"
                    errorMessage={errors.confirmPass?.message}
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
