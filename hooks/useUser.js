"use client";

import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "@/providers/AuthProvider";


const useUser = () => {
    const { user } = useContext(AuthContext); // user: firebase auth user
    const axiosPublic = useAxiosPublic();
    const [dbUser, setDbUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosPublic
                .get(`/users/${user.email}`)
                .then((res) => {
                    setDbUser(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to load user from DB:", err);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [user?.email, axiosPublic]);

    return { dbUser, isLoading };
};

export default useUser;