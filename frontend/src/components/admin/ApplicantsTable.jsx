import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, CircleCheck, CircleX } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { updateStatus } from '@/api/applicationaxios';
// import axios from 'axios';
import { Button } from '../ui/button';


const shortListingStatus = ['Accepted', 'Rejected'];
const ApplicantsTable = () => {
  let isStatusUpdated = false;
  const { applicants } = useSelector(store => store.application);
  const statusHandler = async (status, id) => {
    try {
      // axios.defaults.withCredentials=true;
      const res = await updateStatus(status, id);
      if (res.success) {
        toast.success(res.message);
      }
      if (applicants?.applications?.map((item) => {
        // if(item?.status==='accepted'){
        //   console.log()
        // }
        console.log("insider", item?.status)
        if (item?.status === 'accepted' || item?.status === 'rejected') {
          isStatusUpdated = true
          console.log("is status", isStatusUpdated);
        }

      })) {

      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applicants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                {/* href={`http://localhost:8000${user?.profile?.resume}`} className='text-blue-500 w-full hover:underline cursor-pointer'> {user?.profile?.resumeOriginalName} */}
                <TableCell>
                  {
                    item?.applicant?.profile?.resume ? <a className='text-blue-500 cursor-pointer' href={`http://localhost:8000${item?.applicant?.profile?.resume}`} target='_blank'> {item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                  }
                </TableCell>
                <TableCell>{item?.applicant?.createdAt.split('T')[0]}</TableCell>
                <TableCell className='flex justify-evenly cursor-pointer '>
                  {/* <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className='w-32'> */}
                  {
                    shortListingStatus.map((status, index) => {
                      return (
                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                          {status === 'Accepted' ? (
                            <Button
                              disabled={isStatusUpdated}
                              className={`${isStatusUpdated ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600'
                                }`}
                            >
                              <CircleCheck className='w-4 mr-1' />
                              {status}
                            </Button>
                          ) : (
                            <Button
                              disabled={isStatusUpdated}
                              className={`${isStatusUpdated ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-700 hover:bg-red-600'
                                }`}
                            >
                              <CircleX className='w-4 mr-1' />
                              {status}
                            </Button>
                          )}

                        </div>
                      )
                    })
                  }
                  {/* </PopoverContent>
                  </Popover> */}

                </TableCell>
              </tr>
            ))
          }

        </TableBody>

      </Table>

    </div>
  )
}

export default ApplicantsTable