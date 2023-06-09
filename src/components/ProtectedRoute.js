//HOC ProtectedRoute — этим компонентом защитите роут /, 
//чтобы на него не смогли перейти неавторизованные пользователи

import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...props}) => {
    return (
        <Route>
            {props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in-ya" />}
        </Route>
    );
}

export default ProtectedRoute;