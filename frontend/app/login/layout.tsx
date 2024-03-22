import Logo from "../../components/login/base/Logo";

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <center>
        <div className="mt-36">
          <Logo />
        </div>
      </center>
      <div className="flex justify-center mt-20">
        <div className="flex flex-col items-center">{children}</div>
      </div>
    </>
  );
};

export default LoginLayout;
