import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext'; // Import useUser here
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CoffeeList from './components/CoffeeList';
import Cart from './components/Cart';
import AddCoffee from './components/AddCoffee';
import Orders from './components/Orders';

// Updated ProtectedRoute component
const ProtectedRoute = ({ children, isAdmin }) => {
  const { user } = useUser();

  if (isAdmin && user?.username !== "saketh") {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-bold text-red-600">Access Denied</h1>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

const AppWrapper = () => {
  const navigate = useNavigate(); // Get navigate from useNavigate here

  return (
    <UserProvider navigate={navigate}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/coffees" element={<ProtectedRoute><CoffeeList /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        {/* Protected route for Admin-only access */}
        <Route path="/addcoffee" element={<ProtectedRoute isAdmin={true}><AddCoffee /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute isAdmin={true}><Orders /></ProtectedRoute>} />
        <Route path="*" element={<RedirectBasedOnUser />} />
      </Routes>
    </UserProvider>
  );
};

// Component for redirecting based on user state
const RedirectBasedOnUser = () => {
  const { user } = useUser();
  return <Navigate to={user ? "/home" : "/login"} replace />;
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
