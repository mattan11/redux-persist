import {useDispatch, useSelector} from 'react-redux'
import {add, reset, sub} from './features/countSlice'
import {login, logout} from './features/authSlice'
import {useEffect} from 'react'

const App = () => {
    const dispatch = useDispatch();
    const {auth, count} = useSelector(state => state)

    useEffect(() => {
        fetch('http://localhost:8090/state',)
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'hydrate', payload: data
                })
            });
    }, []);

    return (
        <div className="App">
            <div>
                <h1>{count.value}</h1>
                <button onClick={() => dispatch(add(1))}>add</button>
                <button onClick={() => dispatch(sub(1))}>sub</button>
                <button onClick={() => dispatch(reset())}>reset</button>
            </div>
            <div>
                <h1>Auth: {auth.loggedIn.toString()}</h1>
                <button onClick={() => dispatch(login())}>login</button>
                <button onClick={() => dispatch(logout())}>logout</button>
            </div>
        </div>
    )
}

export default App
