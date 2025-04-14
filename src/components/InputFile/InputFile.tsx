/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
// import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
}

const config = {
  baseURL: "https://api-ecom.duthanhduoc.com/",
  maxSizeUploadAvatar: 1048576,
};

export default function InputFile({ onChange }: Props) {
  const fileInput = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    fileInput.current?.setAttribute('value', '')
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInput.current?.click()
  }
  return (
    <Fragment>
      <input
        className="hidden"
        type="file"
        multiple
        accept="image/*"
        ref={fileInput}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (event.target as any).value = null;
        }}
      />
      <button
        onClick={handleUpload}
        type="button"
        className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
      >
        Chọn ảnh
      </button>
    </Fragment>
  );
}
