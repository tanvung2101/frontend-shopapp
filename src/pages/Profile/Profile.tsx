import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Input from "../../components/Input";
import { Controller } from "react-hook-form";
import InputNumber from "../../components/InputNumber";
import Button from "../../components/Button";

export default function Profile() {
    const { info } = useSelector((state: RootState) => state.account);
  return (
    <div className="rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Hồ sơ của tôi
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form
        className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
        // onSubmit={onSubmit}
        autoComplete="false"
      >
        <div className="mt-6 flex-grow md:pr-12 md:mt-0">
          <div className="flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              email
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <div className="pt-3 text-gray-700">{info?.email}</div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              Tên
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              {/* <Input
                classNameInput="px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                register={register}
                name="name"
                placeholder="Tên"
                errorMessage={errors.name?.message}
              /> */}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              Số điện thoại
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              {/* <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    classNameInput="px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    placeholder="Số điện thoại"
                    errorMessage={errors.phone?.message}
                    onChange={field.onChange}
                  />
                )}
              /> */}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              Đia chỉ
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              {/* <Input
                classNameInput="px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                register={register}
                name="address"
                placeholder="Địa chỉ"
                errorMessage={errors.address?.message}
              /> */}
            </div>
          </div>
          {/* <Controller
            control={control}
            name="date_of_birth"
            render={({ field }) => {
              return (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          /> */}
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
        <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              {/* <img
                src={previewImage || getAvatarUrl(avatar || "")}
                alt=""
                className="w-full h-full rounded-full object-cover"
              /> */}
            </div>
            {/* <InputFile onChange={handleChangeFile} /> */}
            <div className="mt-3 text-gray-400">
              <div>Dung lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
