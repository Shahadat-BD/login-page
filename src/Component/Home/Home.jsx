import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const Home = () => {
const {user} = useContext(AuthContext)
    return (
        <div className="text-center mt-16">
            <h1 className="text-blue-500 text-3xl">I learned in last few month.</h1>
            <li className="text-lg font-bold list-none mt-1">html</li>
            <li className="text-lg font-bold list-none mt-1">css {user.displayName}</li>
            <li className="text-lg font-bold list-none mt-1">javascript</li>
            <li className="text-lg font-bold list-none mt-1">React.js</li>
            <li className="text-lg font-bold list-none mt-1">Tailwind css</li>
       </div>
    );
};

export default Home;