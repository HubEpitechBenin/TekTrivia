import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // durée du "faux chargement"

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <div className={`${loading ? "opacity-30 pointer-events-none" : "opacity-100 transition-opacity duration-200"}`}>
        {children}
      </div>
    </>
  );
};

export default PageTransition;
