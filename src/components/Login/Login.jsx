import  Form  from '../Form/Form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slice/userSlice'; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const dispatch = useDispatch();
    const handlLogin = (email, password) => {
const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))

            })
            .catch(() => alert('Invalid user!'))
    };


  return (
    <div>
          <Form
            title = "Sing In"
              handleClick = {handlLogin } />
    </div>
  )
}

export default Login
