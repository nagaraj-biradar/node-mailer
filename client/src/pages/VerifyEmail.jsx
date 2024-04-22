import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { baseUrl, postRequest } from "../utils/service";

export const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user, updateUser } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get("emailToken");

  useEffect(() => {
    (async () => {
      if (user?.isVerified) {
        console.log("user Verified:", user.isVerified);
        setTimeout(() => {
          return navigate("/");
        }, 3000);
      } else {
        if (emailToken) {
          setIsLoading(true);
          const response = await postRequest(
            `${baseUrl}/users/verify`,
            JSON.stringify({ emailToken })
          );
          setIsLoading(false);
          if (response.error) {
            return setError(error);
          }
          updateUser(response);
        }
      }
    })();
  }, [emailToken, user]);

  return (
    <div>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          {user?.isVerified ? (
            <div>
              <Alert severity="success">Email already verified!</Alert>
            </div>
          ) : (
            <div>
              {error.error ? (
                <Alert severity="error">{error.message}</Alert>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
