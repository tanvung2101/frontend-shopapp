import Input from '../../../components/Input';
import Button from '../../../components/Button';
import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  password: yup.string().required("Vui lòng nhập mật khẩu cũ"),
  new_password: yup
    .string()
    .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng nhập lại mật khẩu mới"),
});
type ChangePasswordSchema = yup.InferType<typeof schema>;
export default function ChangePassword() {
    const {
        control,
      handleSubmit,
      formState: { errors },
    } = useForm<ChangePasswordSchema>({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data:ChangePasswordSchema) => {
      console.log("Dữ liệu hợp lệ:", data);
      // Xử lý cập nhật mật khẩu ở đây
    };
  return (
    <div className="rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Đổi mật khẩu
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form
        className="mt-8 mr-auto max-w-2xl"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="false"
      >
        <div className="mt-6 flex-grow md:pr-12 md:mt-0">
          <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              Mật khẩu cũ
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Mật khẩu"
                    className="mt-1"
                    errorMessage={errors.password?.message}
                    autoComplete="off"
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              Mật khẩu mới
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Controller
                name="new_password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Mật khẩu mới"
                    className="mt-1"
                    errorMessage={errors.new_password?.message}
                    autoComplete="off"
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              Nhập lại mật khẩu mới
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    className="mt-1"
                    errorMessage={errors.confirm_password?.message}
                    autoComplete="off"
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize"></div>
            <div className="sm:w-[80%] sm:pl-5">
              <Button
                type="submit"
                className="flex items-center h-9 bg-orange px-5 text-center text-sm text-white hover:bg-orange/80 rounded-sm"
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
