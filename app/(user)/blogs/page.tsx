import NewsGrid from "@/components/news/NewsGrid";
import PageTitle from "@/components/shared/PageTitle";
import { FC } from "react";
interface NewsProps {}
const News: FC<NewsProps> = () => {
  return (
    <div className="grid gap-20">
      <div className="hidden  bg-[url('/images/bg-deco.svg')] bg-cover bg-center absolute top-0 right-0 w-[60%] h-[200px] md:flex z-0" />
      <PageTitle title="Blogs" />
      <div className="w-frame space-y-20">
        <div className="lg:w-[60%] mx-auto space-y-8">
          <h5 className="text-[1.6rem] text-primary text-center leading-[2.4rme] font-semibold">
            Inspiring the Future, One Post at a Time
          </h5>
          <h3 className=" text-[2.4rem] lg:text-[4.8rem] text-center text-primary lg:leading-[6rem]">
            OUR BLOG
          </h3>
          <p className="text-[#667085] text-center text-[1.6rem] lg:text-2xl leading-[3rem]">
            Explore our blog to discover how we&apos;re shaping the next generation
            of tech-savvy innovators.
          </p>
        </div>

        <div>
          <NewsGrid />
        </div>
      </div>
    </div>
  );
};

export default News;
