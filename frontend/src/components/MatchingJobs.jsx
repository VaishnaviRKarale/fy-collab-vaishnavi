import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_PROFILE_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Briefcase, Building, DollarSign, List } from "lucide-react";

const MatchingJobs = ({ theme }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMatchingJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${USER_PROFILE_API_END_POINT}/matching-jobs`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setJobs(response.data.jobs);
      } else {
        setJobs([]);
        setError(response.data.message || "No matching jobs found");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchingJobs();
  }, []);

  return (
    <div
      className={`h-min ${
        theme === "dark" ? "bg-[#2b2b2b] text-gray-200" : ""
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Jobs Matching your skills</h2>

      {loading && <p className="text-gray-600">Fetching for you...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && jobs.length === 0 && !error && (
        <p>No jobs found matching your skills.</p>
      )}

      <div className="h-min grid md:grid-rows-2 lg:grid-rows-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className={`p-5 rounded-xl border
            ${
              theme === "dark"
                ? "bg-[#3b3b3b] border-none text-gray-200"
                : "bg-white text-gray-900"
            }
          `}
          >
            <h3 className="text-xl font-semibold">{job.title} @{job.company.name}</h3>

            <p className={`mt-2 text-lg font-medium ${theme === "dark" ? "text-gray-300" : ""}`}>
              Salary: {job.salary} LPA
            </p>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Requirements: {job.requirements.join(", ")}
            </p>

            <Button
              onClick={() => navigate(`/description/${job._id}`)}
              className="mt-4 w-full py-2 text-md font-semibold"
            >
              View Job
            </Button>
          </div>
        ))}
      </div>

      <button
        onClick={fetchMatchingJobs}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Refresh Jobs
      </button>
    </div>
  );
};

export default MatchingJobs;
