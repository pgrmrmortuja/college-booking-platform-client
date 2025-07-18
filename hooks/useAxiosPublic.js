import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://college-booking-platform-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;