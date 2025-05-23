/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import imageApi from "../../apis/imageApis";
import Button from "../../components/Button";
import InputFile from "../../components/InputFile";
import Input from "../../components/Input";
import InputNumber from "../../components/InputNumber";
import accountApis, { UpdateUser } from "../../apis/authApis";
import { storage } from "../../utils/storage";
import { AppContext } from "../../contexts/app.context";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const userSchema = yup.object({
  name: yup.string().max(160, "Độ dài tối đa là 160 ký tự").optional(),
  phone: yup.string().max(20, "Độ dài tối đa là 20 ký tự").optional(),
  address: yup.string().max(160, "Độ dài tối đa là 160 ký tự").optional(),
  avatar: yup.string().max(1000, "Độ dài tối đa là 1000 ký tự").optional(),
});
type FormData = {
  name?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  avatar?: string | undefined;
};

type UpdateUserVariables = {
  user: UpdateUser;
  userId: number;
};
export default function Profile() {
  const { profile, setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: profile?.name,
      phone: profile?.phone || "",
      address: "",
      avatar: profile?.avatar || "",
    },
    resolver: yupResolver(userSchema),
  });
  const updateProfileMutation = useMutation({
    mutationFn: ({ user, userId }: UpdateUserVariables) => accountApis.updateUser(user, userId),
    onSuccess(data) {
      setProfile(data.data)
      storage.setInfo(data.data)
      toast.success(data.message)
    },
  });
  const uploadAvatarMutation = useMutation({
    mutationFn: (form:globalThis.FormData) => imageApi.uploadImage(form),
    onSuccess(data) {
      setValue("avatar", data.files[0]);
    },
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    updateProfileMutation.mutate({ user: data, userId: profile?.id as number });
  });
  const handleChangeFile = (file?: File) => {
    setFile(file);
  };
  const previewImage = useMemo(
    () => (file ? URL.createObjectURL(file) : ""),
    [file]
  );
  const uploadImage = async () => {
    if (file) {
      const form = new FormData();
      form.append("images", file);
      uploadAvatarMutation.mutate(form);
      // console.log(result.files[0]);
      // https://shopapp-online.s3.ap-southeast-1.amazonaws.com/uploads/1743178884098-shopping.webp
    }
  };
  useEffect(() => {
    uploadImage();
  }, [file]);
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      // setValue('address', profile.address || '')
      setValue('avatar', profile.avatar)
      // setValue('date_of_birth', profile.date_of_birth ? new Date(profile?.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
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
        onSubmit={onSubmit}
        autoComplete="false"
      >
        <div className="mt-6 flex-grow md:pr-12 md:mt-0">
          <div className="flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              email
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <div className="pt-3 text-gray-700">{profile?.email}</div>
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
            </div>
          </div>
          <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              Số điện thoại
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Controller
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
              />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
              Đia chỉ
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Địa chỉ"
                    className="mt-4"
                    errorMessage={errors.address?.message}
                    autoComplete="off"
                  />
                )}
              />
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
              <img
                src={
                  profile?.avatar ? profile?.avatar : previewImage ? previewImage : ""
                }
                alt="hh"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <InputFile onChange={handleChangeFile} />
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
