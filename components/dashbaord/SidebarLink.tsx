import Link from "next/link";
import { FC } from "react";

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  link: string;
}
const SidebarLink: FC<SidebarLinkProps> = ({ icon, text, link }) => {
  return (
    <Link
      href={link}
      className="flex gap-4 px-3 py-4 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all ease-in duration-500"
    >
      <span className="inline-flex">{icon}</span>
      <span className="inline-flex">{text}</span>
    </Link>
  );
};

export default SidebarLink;
