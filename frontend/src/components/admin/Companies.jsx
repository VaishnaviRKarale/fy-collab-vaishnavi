import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { ThemeContext } from '@/ThemeContext'

const Companies = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div className={`h-screen ${theme === "dark" ? "bg-[#191919] text-gray-300" : ""}`}>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className={`outline-none w-fit ${theme === "dark" ? "border-none bg-gray-600 placeholder:text-gray-400 text-gray-300" : "border border-gray-300"}`}
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className={`${theme === "dark" ? "bg-gray-600 hover:bg-gray-700" : ""}`} onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies