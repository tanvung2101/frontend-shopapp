import axiosInstance from "./axios";

const imageApi = {
  uploadImage(body: FormData): Promise<{
    message: string;
    files: string[];
  }> {
        console.log(body)
        return axiosInstance.post(`images/upload/aws`, body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  },
};

export default imageApi;
