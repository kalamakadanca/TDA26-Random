interface Props {
  title: string;
}

export default function SideBarItem({title}: Props) {
  return (
    <div className="w-full h-full flex p-3 items-center hover:bg-blue-200 rounded cursor-pointer">
      <h3>{title}</h3>
    </div>
  );
}
