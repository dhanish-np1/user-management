import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getingUserData = async () => {
  try {
    const UserData = await instance.get('/admin/getData');
    return UserData.data;
  } catch (error) {
    console.log(error);
  }
};