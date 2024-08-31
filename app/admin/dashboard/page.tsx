"use client"

import SummaryCard from "@/components/dashbaord/SummaryCard";
import { fetchGallery } from "@/lib/redux/slices/gallery/galleryThunk";
import { fetchAllNewsPost } from "@/lib/redux/slices/news/newsThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { CircleUser } from "lucide-react";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface DashboardProps {}
const Dashboard: FC<DashboardProps> = () => {
  const { allNewsPost } = useSelector((store: RootState) => store.news);
  const { gallery } = useSelector((store: RootState) => store.gallery);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchAllNewsPost());
        await dispatch(fetchGallery());
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="p-8 bg-white  min-h-[400px]">
      <div className="grid grid-cols-2 gap-12">
        <SummaryCard
          index={2}
          icon={<CircleUser />}
          title="News "
          value={allNewsPost?.length}
        />
        <SummaryCard
          index={3}
          icon={<CircleUser />}
          title="Gallery Items "
          value={gallery?.length}
        />
      </div>
    </div>
  );
};

export default Dashboard;
