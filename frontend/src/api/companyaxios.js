import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';


const instance = axios.create({
  baseURL: COMPANY_API_END_POINT,

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const registerCompany = async ({ companyName }) => {
  try {
    const token = localStorage.getItem('token');
    console.log("in ragisterjobs", token);
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await instance.post('/register', { companyName }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateCompany = async (companyId,companyFormData) => {
  try {
    const token = localStorage.getItem('token');
    console.log("in update company ", token);
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await instance.put(`/update/id/${companyId}`,companyFormData, {
      headers: {
                         
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getSingleCompany = async (companyId) => {
  try {
    const token = localStorage.getItem('token');
    console.log("in getSingleCompany ", token);
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await instance.get(`/get/id/${companyId}`, {
      headers: {
                         
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    console.log("in getsinglecompany",response.data.company)

    return response.data;
    
  } catch (error) {
    throw error;
  }
}
export const getAllCompanies = async ()=>{
try {
  const token = localStorage.getItem('token');
  console.log("in getAllCompanies ", token);
  if (!token) {
    throw new Error('Token not found');
  }
  const response = await instance.get(`/getyourcompanies`, {
    headers: {
                       
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });

  return response.data;
} catch (error) {
  throw error
}
}