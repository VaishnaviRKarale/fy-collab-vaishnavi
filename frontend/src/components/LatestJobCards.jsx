import React, { useContext } from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '@/ThemeContext'

const LatestJobCards = ({job}) => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className={`h-max p-5 rounded-md shadow-md cursor-pointer ${theme === "dark" ? "bg-[#292929] text-gray-300" : "bg-white border border-gray-100"}`}>
            <div>
                <h1 className={`font-semibold text-xl ${theme === "dark" ? "text-gray-100" : ""}`}>{job?.company?.name}</h1>
                <p className={`mt-1 text-sm ${theme==="dark"?"text-gray-400":"text-gray-500"}`}>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className={`text-justify mt-1 text-sm ${theme==="dark"?"text-gray-300":"text-gray-500"}`}>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={`text-yellow-600 font-bold ${theme === "dark" ? "text-yellow-400 border-yellow-400 shadow-lg shadow-yellow-500/30" : ""}`} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={`text-green-600 font-bold ${theme === "dark" ? "text-green-400 border-green-400 shadow-lg shadow-green-500/30" : ""}`} variant="ghost">{job?.jobType}</Badge>
                <Badge className={`text-blue-600 font-bold ${theme === "dark" ? "text-blue-400 border-blue-400 shadow-lg shadow-blue-500/30" : ""}`} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards