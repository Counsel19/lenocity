import { Goal, Telescope } from "lucide-react";
import { FC } from "react";

interface VisionMissionProps {}

const VisionMission: FC<VisionMissionProps> = ({}) => {
  return (
    <div className="w-frame space-y-8  lg:max-w-[50%]">
      <div className="flex items-center">
        <div className="bg-white translate-x-[3rem] grid place-content-center w-[200px] border h-[100px] rounded-full ">
          <Telescope className="text-[3rem] text-[#14b8a6]" size={40} />
        </div>
        <div className="bg-[#14b8a6] text-white p-12 flex flex-col items-end">
          <h5 className="uppercase text-[1.8rem] font-semibold ">Vission</h5>
          <p className="text-[1.3rem] leading-[2.5rem] font-medium max-w-[80%]">
            To provide a well simplified and easy learning approach to help
            every beginner in Technology to be confident and build the basic
            foundation in coding and design.
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="bg-[#9333ea] text-white p-12">
          <h5 className="uppercase text-[1.8rem] mb-4 font-semibold">Goal</h5>
          <p className="text-[1.3rem] leading-[2.5rem] font-medium max-w-[80%]">
            We are geared towards creating safe learning spaces for young
            people, providing after training, mentoring and career guidance to
            help them in career choices.
          </p>
        </div>
        <div className="bg-white -translate-x-[3rem] w-[200px] border h-[100px] grid place-content-center rounded-full ">
          <Goal className="text-[#9333ea]" size={40}/>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
