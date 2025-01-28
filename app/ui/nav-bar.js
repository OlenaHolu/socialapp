import NavLink from '@/app/ui/nav-link'
import {
    HomeIcon,
    MagnifyingGlassIcon,
    ChatBubbleLeftIcon,
    PlusCircleIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';


export default () => {

    return (
        <nav className="flex flex-col gap-4 h-dvh border-e p-2">
            <p className="hidden sm:block">SocialApp</p>
            <NavLink ruta="/" texto="Home" icon={<HomeIcon className="w-6 h-6" />} />
            <NavLink ruta="/search" texto="Search" icon={<MagnifyingGlassIcon className="w-6 h-6" />} />
            <NavLink ruta="/create" texto="Create" icon={<PlusCircleIcon className="w-6 h-6" />} />
            <NavLink ruta="/profile" texto="Profile" icon={<UserCircleIcon className="w-6 h-6" />} />
        </nav>
    );
};
