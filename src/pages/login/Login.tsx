import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import * as yup from "yup";
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import accountApis from "../../apis/authApis";
import axiosInstance from "../../apis/axios";
import { storage } from "../../utils/storage";
import { AppContext } from "../../contexts/app.context";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

interface FormValues {
  email: string;
  password: string;
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
    password: yup.string().min(6).max(10).required("Vui lòng nhập mật khẩu").trim(),
  })
  .required();


export default function Login() {
  const { setProfile, setIsAuthenticated } = useContext(AppContext)
    const navigate = useNavigate();
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<FormValues>({ resolver: yupResolver(schema) , defaultValues: {
      email: '',
      password: ''
    }});

    const loginMutation = useMutation({
      mutationFn: (body: {email: string, password: string}) => accountApis.login(body),
      onSuccess:(data) => {
        axiosInstance.defaults.headers.common = {
          Authorization: `Bearer ${data.access_token}`,
        };
        toast.success(data.message)
        setProfile(data.data)
        setIsAuthenticated(true)
        storage.setToken(data.access_token)
        storage.setInfo(data.data)
        navigate("/");

      },
      onError(error,) {
        toast.error(error.message)
      },
    })

    const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
      loginMutation.mutate({email: values.email,password: values.password})
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
              <div className="text-2xl">Đăng nhập</div>
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
                    placeholder="Mật khẩu"
                    className="mt-2"
                    errorMessage={errors.password?.message}
                    autoComplete="off"
                  />
                )}
              />
              <div className="mt-3">
                <Button
                  className="w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center gap-2"
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400 ">Bạn mới biết đến Shopee?</span>
                <Link to="/register" className="text-red-400 ml-1">
                  Đăng ký
                </Link>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <Link to="/forgot-password" className="text-red-400 ml-1">
                  Quên mật khẩu
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
