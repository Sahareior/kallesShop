import { Navigate, useLocation } from 'react-router-dom';
import useCon from '../Hooks/useCon';


const PrivateRoute = ({children}) => {
    const {user,loading}  = useCon()
    const location = useLocation()

    if(loading){
        return <p>loading..........</p>
    }
    if(user){
        return children
    }
    
    return (
       <Navigate to='/login' state={{state:location}}></Navigate>
    );
};

export default PrivateRoute;