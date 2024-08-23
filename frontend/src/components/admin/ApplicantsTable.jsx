// import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// // import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Check, CircleCheck, CircleX } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import { updateStatus } from '@/api/applicationaxios';
// // import axios from 'axios';
// import { Button } from '../ui/button';


// const shortListingStatus = ['Accepted', 'Rejected'];
// const ApplicantsTable = () => {
//   let isStatusUpdated = false;
//   const { applicants } = useSelector(store => store.application);
//   const statusHandler = async (status, id) => {
//     try {
//       // axios.defaults.withCredentials=true;
//       console.log("clicked")
//       const res = await updateStatus(status, id);
//       if (res.success) {
//         toast.success(res.message);
//       }
//       if (applicants?.applications?.map((item) => {
//         // if(item?.status==='accepted'){
//         //   console.log()
//         // }
//         console.log("insider", item?.status)
//         if (item?.status === 'accepted' || item?.status === 'rejected') {
//           isStatusUpdated = true
//           console.log("is status", isStatusUpdated);
//         }

//       })) {

//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent applicants.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>FullName</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Contact</TableHead>
//             <TableHead>Resume</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className='text-center'>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {
//             applicants && applicants?.applications?.map((item) => (
//               <tr key={item._id}>
//                 <TableCell>{item?.applicant?.fullname}</TableCell>
//                 <TableCell>{item?.applicant?.email}</TableCell>
//                 <TableCell>{item?.applicant?.phoneNumber}{item?.status}</TableCell>

//                 {/* href={`http://localhost:8000${user?.profile?.resume}`} className='text-blue-500 w-full hover:underline cursor-pointer'> {user?.profile?.resumeOriginalName} */}
//                 <TableCell>
//                   {
//                     item?.applicant?.profile?.resume ? <a className='text-blue-500 cursor-pointer' href={`http://localhost:8000${item?.applicant?.profile?.resume}`} target='_blank'> {item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
//                   }
//                 </TableCell>
//                 <TableCell>{item?.applicant?.createdAt.split('T')[0]}</TableCell>
//                 <TableCell className='flex justify-evenly cursor-pointer '>
//                   {/* <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className='w-32'> */}
//                   {
//                     shortListingStatus.map((status, index) => {
//                       return (
//                         <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
//                           {status === 'Accepted'  ? (
//                             <Button
//                               disabled={isStatusUpdated}
//                               className={`${isStatusUpdated ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600'
//                                 }`}
//                             >
//                               <CircleCheck className='w-4 mr-1' />
//                               {status}
//                             </Button>
//                           ) : (
//                             <Button
//                               disabled={isStatusUpdated}
//                               className={`${isStatusUpdated ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-700 hover:bg-red-600'
//                                 }`}
//                             >
//                               <CircleX className='w-4 mr-1' />
//                               {status}
//                             </Button>
//                           )}

//                         </div>
//                       )
//                     })
//                   }
//                   {/* </PopoverContent>
//                   </Popover> */}

//                 </TableCell>
//               </tr>
//             ))
//           }

//         </TableBody>

//       </Table>

//     </div>
//   )
// }

// export default ApplicantsTable



import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '../ui/table';
import { CircleCheck, CircleX } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { updateStatus } from '@/api/applicationaxios';
import { Button } from '../ui/button';

const shortListingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    // Initialize the statusUpdates state with the current status of each application
    if (applicants && applicants.applications) {
      const initialStatus = {};
      applicants.applications.forEach(item => {
        initialStatus[item._id] = item.status;
      });
      setStatusUpdates(initialStatus);
      
    }
  }, [applicants]);

  const statusHandler = async (status, id) => {
    try {
      const res = await updateStatus(status, id);
      if (res.success) {
        toast.success(res.message);
        // Once the status is updated, disable both buttons
        setStatusUpdates(prev => ({ ...prev, [id]: status }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applicants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>Date</TableCell>
            <TableCell className="text-center">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants && applicants.applications && applicants.applications.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-500 cursor-pointer"
                    href={`http://localhost:8000${item?.applicant?.profile?.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell>{item?.createdAt.split('T')[0]}</TableCell>
              <TableCell className="flex justify-evenly cursor-pointer">
                {shortListingStatus.map((status, index) => {
                  const isAccepted = statusUpdates[item._id] === 'accepted' && item.status ==='accepted';
                  const isRejected =  statusUpdates[item._id] === 'rejected' && item.status=== 'rejected';

                  return (
                    <React.Fragment key={index}>
                      {status === 'Accepted' && (
                        <Button
                          onClick={() => statusHandler(status, item._id)}
                          disabled={isAccepted || isRejected}
                          className={`${
                            isAccepted || isRejected
                              ? 'bg-gray-600 cursor-not-allowed'
                              : 'bg-green-700 hover:bg-green-600'
                          }`}
                        >
                          <CircleCheck className="w-4 mr-1" />
                          {status}
                        </Button>
                      )}
                      {status === 'Rejected'  && (
                        <Button
                          onClick={() => statusHandler(status, item._id)}
                          disabled={isAccepted || isRejected}
                          className={`${
                            isAccepted || isRejected
                              ? 'bg-gray-600 cursor-not-allowed'
                              : 'bg-red-700 hover:bg-red-600'
                          }`}
                        >
                          <CircleX className="w-4 mr-1" />
                          {status}
                        </Button>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;



