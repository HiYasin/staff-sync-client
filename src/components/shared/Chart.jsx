import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import useAxios from '../../customHooks/useAxios';

const Chart = ({email}) => {
    const [axiosSecure] = useAxios();
    const { data: salaryInfo = [] } = useQuery({
        queryKey: ['tasks', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payroll?email=${email}`);
            return res.data;
        }
    });
    //console.log(salaryInfo);
    
    return (
        <BarChart width={600} height={300} data={salaryInfo}>
            <XAxis dataKey={(data) => `${data.month} ${data.year}`} stroke="gray" />
            <YAxis dataKey="salary" />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="salary" fill="gray" barSize={30} />
        </BarChart>
    )
};
export default Chart