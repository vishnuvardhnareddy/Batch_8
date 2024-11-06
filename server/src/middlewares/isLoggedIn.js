import { ApiError } from "../utils/ApiError.js";
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // If authenticated, proceed to the next middleware/controller
    }
    return next(new ApiError(401, 'You must be logged in to access this resource.'));
};

export default isLoggedIn;