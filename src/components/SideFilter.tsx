import { Controller, useForm } from "react-hook-form";
import InputNumber from "./InputNumber";
import Button from "./Button";
import RatingStars from "./RatingStars";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import path from "../constants/path";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { QueryConfig } from "../hooks/useQueryConfig";
import { Category } from "../interface/category.interface";
import classNames from "classnames";

type FormData = {
  price_max?: string;
  price_min?: string;
};

interface Props {
  queryConfig: QueryConfig;
  categories: Category[];
}

const schema = yup.object().shape({
  price_min: yup
    .string()
    .matches(/^\d*$/, "Chỉ nhập số")
    .test(
      "min-less-than-max",
      "Giá tối thiểu phải nhỏ hơn giá tối đa",
      function (value) {
        const { price_max } = this.parent;
        return !price_max || !value || Number(value) <= Number(price_max);
      }
    ),
  price_max: yup.string().matches(/^\d*$/, "Chỉ nhập số"),
});

export default function SideFilter({ queryConfig, categories }: Props) {
  const navigate = useNavigate();
  const { category } = queryConfig;
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      price_min: "",
      price_max: "",
    },
    resolver: yupResolver(schema),
    // shouldFocusError: false,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const filteredParams = Object.fromEntries(
      Object.entries({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min,
      }).filter(([, value]) => value !== undefined && value !== "") // Loại bỏ undefined
    ) as Record<string, string>;;
    navigate({
      pathname: path.home,
      search: createSearchParams(filteredParams).toString(),
    });
  });

  const handleRemoveAll = () => {
    // const newQueryConfig = omit(queryConfig, [
    //   "price_max",
    //   "price_min",
    //   "rating_filter",
    //   "category",
    // ]);
    navigate({
      pathname: path.home,
      search: "",
    });
  };
  return (
    <div className="py-4">
      <Link to={path.home} className="flex items-center font-bold">
        <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
          <g fillRule="evenodd" stroke="none" strokeWidth={1}>
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className="bg-gray-300 h-[1px] my-4"></div>
      <ul>
        {categories &&
          categories.map((categoryItem) => {
            const isActive = category === String(categoryItem.id);
            return (
              <li className="py-2 pl-2" key={categoryItem.id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: String(categoryItem.id),
                    }).toString(),
                  }}
                  className={classNames("relative px-2", {
                    "text-orange font-semibold": isActive,
                  })}
                >
                  {isActive && (
                    <svg
                      viewBox="0 0 4 7"
                      className="absolute top-1 left-[-10px] h-2 w-2 fill-orange"
                    >
                      <polygon points="4 3.5 0 0 0 7" />
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            );
          })}
      </ul>
      <Link
        to={path.home}
        className="flex items-center font-bold mt-4 uppercase"
      >
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="mr-3 h-4 w-3 fill-current stroke-current"
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        bộ lọc tìm kiếm
      </Link>
      <div className="bg-gray-300 h-[1px] my-4"></div>
      <div className="my-5">
        <div>Khoản giá</div>
        <form className="mt-2" onSubmit={onSubmit}>
          <div className="flex items-start">
            <Controller
              control={control}
              name="price_min"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    className="grow"
                    placeholder="đ TỪ"
                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    classNameError="hidden"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_max");
                    }}
                  />
                );
              }}
            />

            <div className="mx-2 mt-2 shrink-0"></div>
            <Controller
              control={control}
              name="price_max"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    className="grow"
                    placeholder="đ ĐẾN"
                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    classNameError="hidden"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_min");
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm text-center">
            {errors.price_min?.message}
          </div>
          <Button className="w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center">
            Âp dụng
          </Button>
        </form>
      </div>
      <div className="bg-gray-300 h-[1px] my-4"></div>
      <div className="text-sm">Đáng giá</div>
      <RatingStars queryConfig={queryConfig}/>
      <div className="bg-gray-300 h-[1px] my-4"></div>
      <Button
        onClick={() => handleRemoveAll()}
        className="w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center"
      >
        xoá tất cả
      </Button>
    </div>
  );
}
