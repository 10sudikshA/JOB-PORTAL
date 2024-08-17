// src/api/axios.js
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const instance = axios.create({
  baseURL: USER_API_END_POINT,
 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const registerUser = async (formData) => {
  try {
    const response = await instance.post('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (input) => {
  try {
    const response = await instance.post('/login', input, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// export const loginUser = async (input) => {
//   try {
//     const response = await instance.post(`${USER_API_END_POINT}/login`, input, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       withCredentials: true
//     });
//     console.log(response.data);
//     // const { token } = response.data; // Assuming your backend sends back a token
//     // localStorage.setItem('token', token); // Store token in localStorage

//     // return token;
//     const token= response.data.token;
//     console.log(token);
//     localStorage.setItem('token', token);
//     const token2 = localStorage.getItem('token');
//     console.log("token2",token2);
//     return response.data;

//   } catch (error) {
//     throw error;

//   }
// }

export const profileUpdate = async (formData)=>{
  try {
    const token = localStorage.getItem('token');
    console.log("in profile update token",token);
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await instance.post(`${USER_API_END_POINT}/profile/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    console.log("response data",response.data);
    return response.data;

  } catch (error) {
    console.log(error);

  }
}

export const logoutUser = async () => {
  // const token = localStorage.getItem('token');
  // console.log("in logoutUser token",token);
  // if (!token) {
  //   throw new Error('Token not found');
  // }
  try {
    const response = await instance.get(`${USER_API_END_POINT}/logout`, {
      // headers: {
      //    Authorization: `Bearer ${token}`
      // },
      withCredentials: true,
    });
    localStorage.removeItem('token'); // Clear token from localStorage
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling code
  }
};


export default instance;
