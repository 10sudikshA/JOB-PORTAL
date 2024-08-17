import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { User2, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/api/axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

function Navbar() {
    // const user = false;

    const { user } = useSelector(store => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await logoutUser();

            if (res.success) {
                dispatch(setUser(null));

                navigate('/');

                toast.success(res.message);
            } else {

                toast.error(res.message || 'Logout failed');
            }
        } catch (error) {

            console.error('Logout error:', error);
            toast.error(error.response?.data?.message || 'An error occurred during logout');
        }
    };


    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ?
                                <>
                                    <li><Link to='/admin/companies'>Companies</Link></li>
                                    <li><Link to='/admin/jobs'>Jobs</Link></li>
                                </>
                                :
                                <>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/jobs'>Jobs</Link></li>
                                    <li><Link to='/browse'>Browse</Link></li>
                                </>
                        }

                    </ul>
                    {
                        !user ?
                            <div className='flex items-center gap-2'>
                                <Link to='/login'><Button variant='outline'>Login</Button></Link>
                                <Link to='/signup'><Button className='bg-[#F83002] hover:bg-[#f44b25]'>Signup</Button></Link>

                            </div>
                            :
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user.fullname || "@user"} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user.fullname || "@user"} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className=' text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>

                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant='link'><Link to='/profile'>View Profile</Link></Button>
                                                </div>
                                            )

                                        }

                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant='link'>Logout</Button>
                                        </div>


                                    </div>

                                </PopoverContent>
                            </Popover>
                    }



                </div>
            </div>


        </div>
    )
}

export default Navbar
