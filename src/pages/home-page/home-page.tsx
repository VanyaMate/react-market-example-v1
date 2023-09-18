import { useSlice } from '@/hooks/redux/useSlice.ts';


const HomePage = () => {
    const userSlice = useSlice((state) => state.user);

    return (
        <div>
            HomePage for { userSlice.user?.login }
        </div>
    );
};

export default HomePage;