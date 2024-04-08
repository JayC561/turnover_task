import React, { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserContext } from "../AuthProvider";

interface ProtectedRouteProps extends PropsWithChildren {
  keyToCheck: keyof UserContext;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  keyToCheck,
}) => {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-up", { replace: true });
    }
    if (user && !user[keyToCheck] && keyToCheck === "email") {
      navigate("/sign-up", { replace: true });
    }
    if (user && !user[keyToCheck] && keyToCheck === "isLogined") {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
