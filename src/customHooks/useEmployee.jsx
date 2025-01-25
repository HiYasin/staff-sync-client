import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useEmployee = () => {
    const [axiosSecure] = useAxios();

    const { refetch, data: employees = [] } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/employee');
            return res.data;
        }
    });

    return [employees, refetch];
};

export default useEmployee;