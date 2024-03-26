import LoginFrom from "@/components/LoginFrom";
import { getAccessToken } from "@/lib/auth";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const token = getAccessToken();

  return (
    <>
      {!token ? (
        <div className="flex h-screen items-center justify-center">
          <div className="hidden h-screen w-1/2 lg:block">
            <img
              src="https://images.unsplash.com/photo-1518130242561-edb760734bee?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Placeholder login image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative w-full p-8 md:p-52 lg:w-1/2">
            <div className="lg:p-8">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Login
                  </h1>
                </div>
                <LoginFrom />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
