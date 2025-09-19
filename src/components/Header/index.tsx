interface HeaderProps {
  appName: string;
}

const Header = ({ appName }: HeaderProps) => {
  return (
    <div className="flex justify-center bg-primary text-white p-1">
      <h1 className="text-2xl">{appName}</h1>
    </div>
  );
};

export default Header;
