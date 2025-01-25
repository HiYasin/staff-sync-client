
import { UserIcon } from 'lucide-react';
import useAuth from './useAuth';
import {
    UserCircleIcon,
    PowerIcon,
    LifebuoyIcon,
    InboxArrowDownIcon,
    Cog6ToothIcon,
  
  } from "@heroicons/react/24/solid";
const useProfileMenu = () => {
    const { userInfo } = useAuth();
    let dashboard = '';
    if(userInfo.role === 'employee') {
        dashboard = '/dashboard/work-sheet';
    } else if(userInfo.role === 'hr') {
        dashboard='/dashboard/employee-list';
    } else{
        dashboard = '/dashboard/work-sheet';
    }

    const profileMenuItems = [
        {
          label: "My Profile",
          icon: UserCircleIcon,
          link: '/',
        },
        {
          label: "Edit Profile",
          icon: Cog6ToothIcon,
          link: '/contact',
        },
        {
          label: "Dashboard",
          icon: InboxArrowDownIcon,
          link: dashboard,
        },
        {
          label: "Help",
          icon: LifebuoyIcon,
          link: '/signin',
        },
        {
          label: "Sign Out",
          icon: PowerIcon,
          link: '/signin',
        },
      ];
    return profileMenuItems;
};

export default useProfileMenu;