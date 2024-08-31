import { INews } from "@/types/news";
import { format } from "date-fns";
import Link from "next/link";
import { FC } from "react";

interface NewsCardProps {
  data: INews;
}
const NewsCard: FC<NewsCardProps> = ({
  data: { body, createdAt, image, title, _id },
}) => {
  return (
    <Link href={`/blogs/${_id}`} className="space-y-10 shadow-md rounded-md p-4">
      <div className="border h-[20rem] lg:h-[24rem] rounded-md">
        <img src={image} alt={title} className="object-cover h-full  w-full" />
      </div>
      <div className="space-y-2">
        <span className="text-base text-primary leading-[2rem]">
          {format(createdAt, "do MMM, YYY")}
        </span>

        <h5 className="font-semibold text-[#101828] text-[1.8rem] leading-[2.2rem] lg:text-[2.2rem] lg:leading-[3.2rem]">
          {title}
        </h5>

        <p
          className="text-[1.6rem] text-[#667085] leading-[2.1rem]"
          dangerouslySetInnerHTML={{ __html: body.slice(0, 150) }}
        ></p>
      </div>
    </Link>
  );
};

export default NewsCard;
