import { useUser } from '../context/UserContext'; // Adjust the path as needed

const Home = () => {
    const { user } = useUser();
    return (
        <div>
            <h1>Welcome, {user?.username || 'Guest'}!</h1>
            <p>This is the home page.</p>
        </div>
    );
};

export default Home;
