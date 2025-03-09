import React, { useContext } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import ThemeToggle from '../ThemeToggle'
import { ThemeContext } from '@/ThemeContext'

const Navbar = () => {

    const {theme, toggleTheme} = useContext(ThemeContext)

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className={`border-b ${theme === "dark" ? "border-gray-800 bg-[#191919] text-slate-300" : "bg-white"}`}>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-slate-300" : "text-black"}`}>Cold<span className='text-[#ec2525]'>Cup</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                    <li><Link to="/network">Network</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className={`flex items-center gap-2 ${theme === "dark" ? "text-slate-700" : "text-black"}`}>
                                <Link to="/login"><Button variant="outline" className={`border-none outline-none ${theme === "dark" ? "bg-slate-700 text-gray-300 hover:bg-slate-700 hover:text-slate-300" : "bg-gray-200 hover:bg-gray-300 text-slate-700"}`}>Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#ec2525] hover:bg-[#d42121]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className={`w-80 border-none outline-none ${theme === "dark" ? "bg-[#252525] text-white" : "shadow-[5px_5px_35px_5px_rgba(0,0,0,0.08)]"}`}>
                                    <div>
                                        <div className='flex items-center gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold'>{user?.fullname}</h4>
                                                <p className={`text-sm ${theme === "dark" ? "text-gray-300 tracking-wide" : ""}`}>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className={`flex flex-col my-2 ${theme === "dark" ? "text-gray-300" : "text-black"}`}>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className={`flex w-fit items-center gap-2 cursor-pointer`}>
                                                        <User2 />
                                                        <Button className={` ${theme === "dark" ? "text-slate-300" : ""}`} variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button className={` ${theme === "dark" ? "text-slate-300" : ""}`} onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                    <ThemeToggle />

                </div>
            </div>

        </div>
    )
}

export default Navbar