
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '../ui/table';
import { CircleCheck, CircleX } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { updateStatus } from '@/api/applicationaxios';
import { Button } from '../ui/button';

const shortListingStatus = {
  accepted: 'Accepted',
  rejected: 'Rejected',
};

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    if (applicants?.applications) {
      const initialStatus = applicants.applications.reduce((acc, item) => {
        acc[item._id] = item.status.toLowerCase();
        return acc;
      }, {});
      setStatusUpdates(initialStatus);
    }
  }, [applicants]);

  const statusHandler = async (status, id) => {
    setStatusUpdates(prev => ({ ...prev, [id]: status }));

    try {
      const res = await updateStatus(status, id);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
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
          {applicants?.applications?.map(item => (
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
                  'NA'
                )}
              </TableCell>
              <TableCell>{item?.createdAt.split('T')[0]}</TableCell>
              <TableCell className="flex justify-evenly">
                {Object.entries(shortListingStatus).map(([key, label]) => {
                  const currentStatus = statusUpdates[item._id];
                  const isStatusSelected = currentStatus === key;
                  const isOtherStatusSelected = currentStatus && currentStatus !== 'pending' && currentStatus !== key;

                  return (
                    !isOtherStatusSelected && (
                      <Button
                        key={key}
                        onClick={() => statusHandler(key, item._id)}
                        disabled={isStatusSelected}
                        className={`${
                          isStatusSelected ? 'bg-gray-600 cursor-not-allowed' : `bg-${key === 'accepted' ? 'green' : 'red'}-700 hover:bg-${key === 'accepted' ? 'green' : 'red'}-600`
                        }`}
                      >
                        {key === 'accepted' ? <CircleCheck className="w-4 mr-1" /> : <CircleX className="w-4 mr-1" />}
                        {label}
                      </Button>
                    )
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
