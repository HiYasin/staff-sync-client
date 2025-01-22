import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";


const useTask = () => {
    const [axiosSecure]=useAxios();
    const { user } = useAuth();
    //console.log(user);
    const { refetch, data:tasks=[] } = useQuery({
        queryKey: [ 'tasks', user?.email ],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/work-sheet?email=${user.email}`);
            return res.data;
        }
    });
    return [tasks,refetch];
};

export default useTask;