import React from "react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";

const DashboardFirstDiv = ({user, theme, isResume, setOpen}) => {
  return (
    <>
      <div
        className={`min-w-full  mx-auto rounded-xl p-8 ${
          theme === "dark"
            ? "bg-[#2B2B2B] text-gray-300"
            : "bg-white shadow-[5px_5px_20px_5px_rgba(0,0,0,0.08)]"
        }`}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div className={`flex flex-col gap-2`}>
              <h1
                className={`font-semibold text-xl ${
                  theme === "dark" ? "text-white" : "text-gray-600"
                }`}
              >
                {user?.fullname}
              </h1>
              <p
                className={`text-md tracking-wide ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className={`rounded-full h-12 w-12 text-right outline-none border-none ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            variant="outline"
          >
            <Pen className="text-sm" />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5 flex flex-col gap-2">
          <h1>Skills</h1>
          <div className={`flex items-center gap-4`}>
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
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
              ))
            ) : (
              <span>Resume is not available</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${user?.profile?.resume}?fl_attachment=false`}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardFirstDiv;
