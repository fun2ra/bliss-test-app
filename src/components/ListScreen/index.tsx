import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import TryAgain from "../TryAgain";
import BlissMockApiService from "../../services/BlissMockApiService";

const ListScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const checkServer = (): Promise<void> =>
    BlissMockApiService.checkServerHealth().then((response) => {
      console.log(response);
      setIsServerError(!response);
      setIsLoading(false);
    });

  useEffect(() => {
    setIsLoading(true);
    checkServer();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          {isServerError ? (
            <TryAgain tryAgain={checkServer} />
          ) : (
            <div>list screens</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListScreen;
