import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import accountApis from "../../apis/authApis";
import { useMutation } from "@tanstack/react-query";

interface FormValues {
  email: string;
  name: string;
  password: string;
  confirmPass: string;
}

export default function Register() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Vui lòng nhập họ tên")
      .min(3, "Họ tên phải có ít nhất 3 ký tự")
      .max(50, "Họ tên không được quá 50 ký tự")
    .trim(),

    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email")
      .max(255, "Email không được quá 255 ký tự")
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email không đúng định dạng"
      )
      .trim(),

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
  });


  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPass: "",
    },
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body: {
      email: string,
      name: string,
      password: string,
    }) => accountApis.register(body),
    onSuccess:() => {
      navigate("/login");
    }
  })

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    const { email, password, name } = values;
    registerAccountMutation.mutate({email, password, name})
  };
  return (
    <div className="bg-orange">
      <div className="layout">
        <div className="grid grid-cols-5 py-32 pr-10 max-sm:grid-cols-1 max-sm:py-12 max-sm:pr-0">
          <div className="col-span-2 col-start-4 max-sm:col-span-1">
            <form
              className="p-10 rounded bg-white shadow-sm"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="text-2xl">Đăng kí</div>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Tên của bạn"
                    className="mt-4"
                    errorMessage={errors.name?.message}
                    autoComplete="off"
                  />
                )}
              />
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
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="mt-2"
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
                    placeholder="Confirm password"
                    className="mt-2"
                    errorMessage={errors.confirmPass?.message}
                    autoComplete="off"
                  />
                )}
              />
              <div className="mt-3">
                <Button
                  className="w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center gap-2"
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng kí
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400 ">Bạn đã có tài khoản</span>
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
