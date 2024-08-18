import { FC } from "react";
import NewsGrid from "../news/NewsGrid";

interface BlogSectionProps {}
const BlogSection: FC<BlogSectionProps> = ({}) => {
  return (
    <div className="w-frame">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold uppercase text-orange-500">
          OUR BLOGS
        </h4>
        <h2 className="text-[3rem] leading-[3rem] lg:text-[3.9rem] uppercase font-bold lg:leading-[6.2rem]">
          The Reads that Elightens
        </h2>
      </div>

      <NewsGrid sliceAt={4} />
    </div>
  );
};

export default BlogSection;
