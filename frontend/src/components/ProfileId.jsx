import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { USER_PROFILE_API_END_POINT } from "@/utils/constant";
import Navbar from "./shared/Navbar";
import { ThemeContext } from "@/ThemeContext";
import { Badge } from "./ui/badge";

const Profile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${USER_PROFILE_API_END_POINT}/${id}`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.currentUser);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const skillsArray = user?.profile?.skills;

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#191919] text-gray-300 min-h-screen" : ""
      }`}
    >
      {user ? (
        <>
          <div>
            <Navbar />
            <div
              className={`mx-auto max-w-7xl h-16 mt-8 ${
                theme === "dark" ? "bg-[#191919]" : ""
              }`}
            >
              <div
                className={`p-8 rounded-lg ${
                  theme === "dark" ? "bg-[#2B2B2B]" : ""
                }`}
              >
                <div
                  className={`flex items-center gap-4 ${
                    theme === "dark" ? "" : ""
                  }`}
                >
                  <img
                    src={user?.profile?.profilePhoto}
                    className="w-28 rounded-full h-28"
                    alt=""
                  />
                  <div className={`flex flex-col justify-center gap-3`}>
                    <h1
                      className={`text-2xl font-semibold ${
                        theme === "dark" ? "" : ""
                      }`}
                    >
                      {user?.fullname}
                    </h1>
                    <p>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-4">
                  {skillsArray.map((item, index) => (
                    <Badge
                      className={`transition delay-[0.3s] duration-500 cursor-pointer ${
                        theme === "dark"
                          ? "bg-[#ec2525] shadow-[1px_1px_20px_7px_rgba(255,0,0,0.32)] hover:bg-[rgb(236,193,37)] hover:shadow-[1px_1px_20px_7px_rgba(236,193,37,0.32)]"
                          : ""
                      }`}
                      key={index}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>PING PONG... DING DONG</p>
      )}
    </div>
  );
};

export default Profile;
