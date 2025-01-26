import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";


const useTaskAll = () => {
    const [axiosSecure]=useAxios();
    //console.log(user);
    const { refetch, data:tasks=[] } = useQuery({
        queryKey: [ 'tasks'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/work-sheets`);
            return res.data;
        }
    });
    return [tasks,refetch];
};

export default useTaskAll;