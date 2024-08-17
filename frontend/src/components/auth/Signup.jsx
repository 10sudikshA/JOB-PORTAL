import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/api/axios';
import { toast } from 'sonner';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

function Signup() {
    const { loading,user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""

    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const fileEventHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file)
        }

        try {
            dispatch(setLoading(true));
            const res = await registerUser(formData);
            console.log(res.success);
            if (res.success) {
                navigate('/login');
                toast.success(res.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            dispatch(setLoading(false));
        }

    }
    useEffect(()=>{
        if(user){
            navigate('/');
        }
    },[]);
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 '>Sign Up</h1>
                    <div className='my-2'>
                        <Label className=''>Full Name</Label>
                        <Input
                            type='text'
                            placeholder='Kunal Verma'
                            value={input.fullname}
                            name='fullname'
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='my-2'>
                        <Label >Email</Label>
                        <Input
                            type='email'
                            placeholder='abc@gmail.com'
                            name='email'
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='my-2'>
                        <Label >Phone Number</Label>
                        <Input
                            type='text'
                            placeholder='7455880123'
                            name='phoneNumber'
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='my-2'>
                        <Label >Password</Label>
                        <Input
                            type='password'
                            placeholder='Your password here'
                            name='password'
                            value={input.password}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className=' my-2'>
                            <Label >Profile</Label>
                            <Input
                                accept='image/*'
                                type='file'
                                className='cursor-pointer '
                                onChange={fileEventHandler}
                            />
                        </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-2'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    value='student'
                                    className='cursor-pointer'
                                    name='role'
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1" >Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    value='recruiter'
                                    className='cursor-pointer'
                                    name='role'
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r2" >Recruiter</Label>
                            </div>

                        </RadioGroup>
                        

                    </div>
                    {
                        loading ? <Button className='w-full my-4  bg-[#e8412e] hover:bg-[#f44b25]'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type='submit' className='w-full my-4 bg-[#e8412e] hover:bg-[#f44b25]'>Signup</Button>
                    }

                    <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>

    )
}

export default Signup
