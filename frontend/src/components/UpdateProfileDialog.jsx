import React, { useContext, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { ThemeContext } from "@/ThemeContext"

const skillsData = {
  "Web Development": [
    "html",
    "css",
    "javascript",
    "react",
    "nextjs",
    "vue",
    "angular",
    "nodejs",
    "express",
    "mongodb",
    "typescript",
    "tailwindcss",
    "sass",
    "bootstrap",
    "graphql",
    "redux",
    "vite",
    "webpack",
    "firebase",
    "websockets",
    "astro",
    "remix",
    "svelte",
    "prisma",
  ],
  "Cyber Security": [
    "penetration_testing",
    "network_security",
    "ethical_hacking",
    "cryptography",
    "firewall_configuration",
    "intrusion_detection",
    "digital_forensics",
    "malware_analysis",
    "reverse_engineering",
    "wireshark",
    "metasploit",
    "kali_linux",
    "osint",
    "siem",
    "security_operations",
    "vulnerability_assessment",
    "risk_management",
    "burpsuite",
    "nmap",
    "tcp/ip",
    "zero_day_exploits",
    "identity_and_access_management",
  ],
  "Machine Learning and AI": [
    "python",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "numpy",
    "pandas",
    "matplotlib",
    "seaborn",
    "deep_learning",
    "nlp",
    "computer_vision",
    "reinforcement_learning",
    "neural_networks",
    "cnn",
    "rnn",
    "transformers",
    "xgboost",
    "llms",
    "opencv",
    "huggingface",
    "fastai",
    "mlflow",
    "bayesian_learning",
    "generative_ai",
  ],
  "Data Science": [
    "python",
    "r",
    "sql",
    "pandas",
    "numpy",
    "matplotlib",
    "seaborn",
    "scikit-learn",
    "big_data",
    "hadoop",
    "spark",
    "etl",
    "data_wrangling",
    "data_visualization",
    "predictive_modeling",
    "powerbi",
    "tableau",
    "statistics",
    "data_mining",
    "time_series_analysis",
    "ab_testing",
    "data_pipeline",
    "dbt",
  ],
  "Software Engineering": [
    "c",
    "c++",
    "java",
    "dsa",
    "data structures and algorithms",
    "python",
    "c#",
    "golang",
    "rust",
    "kotlin",
    "swift",
    "oop",
    "design_patterns",
    "agile",
    "git",
    "docker",
    "kubernetes",
    "ci/cd",
    "microservices",
    "rest_api",
    "graphql",
    "solid_principles",
    "test_driven_development",
    "refactoring",
  ],
  "Cloud Computing": [
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "terraform",
    "cloud_security",
    "serverless",
    "lambda",
    "cloud_storage",
    "ec2",
    "s3",
    "cloud_networking",
    "devops",
    "ansible",
    "ci/cd",
    "cloud_monitoring",
    "elastic_kibana",
    "fargate",
    "istio",
  ],
  "Block Chian and Web3": [
    "solidity",
    "ethereum",
    "smart_contracts",
    "web3",
    "nft",
    "metamask",
    "defi",
    "cryptography",
    "truffle",
    "hardhat",
    "hyperledger",
    "bitcoin",
    "polygon",
    "rust",
    "substrate",
    "staking",
    "cosmos",
    "dapps",
    "solana",
    "ipfs",
    "zk_snarks",
  ],
  "Game Development": [
    "unity",
    "unreal_engine",
    "c#",
    "c++",
    "godot",
    "game_physics",
    "shader_programming",
    "opengl",
    "directx",
    "blender",
    "3d_modeling",
    "animation",
    "ai_in_games",
    "multiplayer_networking",
    "ray_tracing",
    "procedural_generation",
    "vr",
    "ar",
  ],
  "DevOps and Site Reliability Engineering": [
    "docker",
    "kubernetes",
    "ci/cd",
    "jenkins",
    "ansible",
    "terraform",
    "prometheus",
    "grafana",
    "helm",
    "aws",
    "azure",
    "gcp",
    "site_reliability_engineering",
    "monitoring",
    "logging",
    "cloud_native",
    "new_relic",
    "incident_response",
  ],
  "Mobile Development": [
    "flutter",
    "react_native",
    "swift",
    "kotlin",
    "android",
    "ios",
    "dart",
    "xamarin",
    "jetpack_compose",
    "cordova",
    "ionic",
    "firebase",
    "graphql",
    "sqlite",
    "realm",
    "native_script",
  ],
  "Embedded System and IOT": [
    "arduino",
    "raspberry_pi",
    "microcontrollers",
    "c",
    "c++",
    "embedded_c",
    "verilog",
    "fpga",
    "rtos",
    "mqtt",
    "iot_security",
    "wireless_protocols",
    "sensor_fusion",
    "pcb_design",
  ],
  "Networking and System Administration": [
    "linux",
    "windows_server",
    "dns",
    "dhcp",
    "tcp/ip",
    "network_configuration",
    "firewall_setup",
    "load_balancing",
    "active_directory",
    "vpn",
    "bash_scripting",
    "powershell",
    "shell_scripting",
  ],
  "Database Management": [
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "redis",
    "cassandra",
    "dynamodb",
    "elasticsearch",
    "neo4j",
    "oracle_db",
    "firebase_firestore",
    "couchdb",
  ],
  "UI/UX Design": [
    "figma",
    "adobe_xd",
    "sketch",
    "wireframing",
    "prototyping",
    "usability_testing",
    "design_systems",
    "user_research",
    "motion_design",
    "visual_hierarchy",
  ],
  "3-D Modelling and Animation": [
    "blender",
    "maya",
    "3ds_max",
    "zbrush",
    "substance_painter",
    "uv_mapping",
    "rigging",
    "motion_capture",
    "cinema_4d",
    "houdini",
  ],
  "Video Editing and Production": [
    "adobe_premiere_pro",
    "final_cut_pro",
    "davinci_resolve",
    "after_effects",
    "color_grading",
    "vfx",
    "motion_graphics",
    "sound_design",
  ],
  "Digital Marketing and SEO": [
    "seo",
    "google_ads",
    "facebook_ads",
    "email_marketing",
    "content_marketing",
    "social_media_management",
    "conversion_rate_optimization",
    "affiliate_marketing",
    "google_analytics",
  ],
  "Finance and Trading": [
    "financial_modeling",
    "stock_trading",
    "forex",
    "cryptocurrency_trading",
    "technical_analysis",
    "fundamental_analysis",
    "risk_management",
    "algo_trading",
  ],
  "Legal and Compliance": [
    "contract_law",
    "intellectual_property",
    "corporate_governance",
    "data_privacy",
    "gdpr",
    "cyber_law",
    "regulatory_compliance",
  ],
}
const skillset = [...new Set(Object.values(skillsData).flat())]

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((store) => store.auth)

  const {theme, toogleTheme} = useContext(ThemeContext)

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || [],
    file: user?.profile?.resume || "",
  })

  const [skillSuggestions, setSkillSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const skillChangeHandler = (e) => {
    const value = e.target.value
    setShowDropdown(true)

    if (value === "") {
      setSkillSuggestions([])
      return
    }

    const filteredSkills = skillset.filter((skill) =>
      skill.toLowerCase().includes(value.toLowerCase())
    )

    setSkillSuggestions(filteredSkills)
  }

  const selectSkill = (skill) => {
    if (!input.skills.includes(skill)) setInput({ ...input, skills: [...input.skills, skill] })
    setShowDropdown(false)
  }

  const removeSkill = (skill) => {
    setInput({ ...input, skills: input.skills.filter((s) => s !== skill) })
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills.join(", ")) 
    if (input.file) formData.append("file", input.file)

    try {
      setLoading(true)
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      )
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Error updating profile")
    } finally {
      setLoading(false)
    }
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[500px] flex flex-col"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col items-start gap-5 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Number
              </Label>
              <Input
                id="number"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 relative">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="skills"
                  name="skills"
                  type="text"
                  onChange={skillChangeHandler}
                  className="w-full"
                  placeholder="Start typing..."
                  autoComplete="off"
                />

                {showDropdown && skillSuggestions.length > 0 && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md max-h-40 overflow-auto z-20">
                    {skillSuggestions.map((skill, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-200 cursor-pointer transition"
                        onClick={() => selectSkill(skill)}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 col-span-3 ml-auto">
              {input.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <X
                    className="w-4 h-4 cursor-pointer hover:text-gray-300 transition"
                    onClick={() => removeSkill(skill)}
                  />
                </span>
              ))}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4 flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog
