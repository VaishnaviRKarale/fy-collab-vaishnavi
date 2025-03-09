import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { USER_PROFILE_API_END_POINT } from "@/utils/constant";
import Navbar from "./shared/Navbar";
import { ThemeContext } from "@/ThemeContext";

const Profile = () => {
  const {theme, toggleTheme} = useContext(ThemeContext)
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${USER_PROFILE_API_END_POINT}/${id}`, {
          withCredentials: true
        });
        setUser(response.data.currentUser);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className={`mx-auto max-w-7xl h-16 mt-8`}>
            <div className={`${theme === "dark" ? "" : ""}`}>
              <h1 className={`text-xl ${theme === "dark" ? "" : ""}`}>{user?.fullname}</h1>
            </div>
          </div>
        </>
      ) : (
        <p>PING PONG... DING DONG</p>
      )}
    </>
  );
};

export default Profile;
