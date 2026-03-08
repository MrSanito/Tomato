 import { useAppData } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Account = () => {
    const {user, setUser, setIsAuth} = useAppData()

    const firstLetter = user?.name.charAt(0).toUpperCase()

    const navigate = useNavigate()

    const logoutHandler = ()=> {
        localStorage.setItem("token", "")
        setUser( null)
        setIsAuth(false)
        navigate("/login")
        toast.success('Logout Successful')
    }
  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6'>
        <div className="mx-auto max-w-md rounded-full bg-white shadow-sm ">
            <div className="flex items-center gap-4 border-b p-5">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-xl font-semibold text-white ">{firstLetter}</div>
            </div>
            <div>
                <h2 className="text-lg font-semibold " > {user?.name}</h2>
                <p className="text-sm text-gray-500"> {user?.email}</p>



                

            </div>
        </div>
    </div>
  )
}

export default Account