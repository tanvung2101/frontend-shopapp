import { InputHTMLAttributes, forwardRef, useState } from "react";

// interface IFormValues {
//   email: string;
//   password: string;
// }
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  // register: UseFormRegister<IFormValues>;
  classNameEye?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({
    className,
    errorMessage,
    placeholder,
    autoComplete,
    name,
    classNameInput = "p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",
    classNameError = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
    classNameEye = "absolute top-4 right-2 h-5 w-5 cursor-pointer",
    ...rest
  }, ref) => {
    const [openEye, setOpenEye] = useState(false);

    const toggleEye = () => {
      setOpenEye((prev) => !prev);
    };
    // console.log(openEye)

    const handleType = () => {
      if (rest.type === "password") {
        return openEye ? "text" : "password";
      }
      // console.log(rest.type)
      return rest.type;
    };
    return (
      <div className={className}>
        <div className="relative">
          <input ref={ref} className={classNameInput} autoComplete={autoComplete} name={name} {...rest} type={handleType()} placeholder={placeholder} />
          {rest.type === "password" && openEye && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={classNameEye}
              onClick={toggleEye}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
          {rest.type === "password" && !openEye && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={classNameEye}
              onClick={toggleEye}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          )}
        </div>
        <div className={classNameError}>{errorMessage}</div>
      </div>
    );
  });

export default Input