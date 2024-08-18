import { FC } from "react";
import { Circles } from "react-loader-spinner";

interface PageLoaderProps {}
const PageLoader: FC<PageLoaderProps> = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <Circles height="80" width="80" color="#871C1F" visible={true} />
    </div>
  );
};

export default PageLoader;
