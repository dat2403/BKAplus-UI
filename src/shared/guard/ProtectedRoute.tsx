import {Outlet, useNavigate} from 'react-router-dom'
import useAuth from "../../hooks/useAuth.ts";
import LoadingPage from "../../pages/LoadingPage/LoadingPage.tsx";
import useAsyncEffect from "../../hooks/useAsyncEffect.ts";
import MainLayout from "../components/MainLayout/MainLayout.tsx";

const ProtectedRoute = () => {
  const {user} = useAuth()
  const navigate = useNavigate();

  useAsyncEffect(async () => {
    if (!user) {
      navigate("login")
    }
  }, [user])

  if (!user) {
    // loading while navigate to login
    return <LoadingPage/>
  }

  // returns child route elements
  return <MainLayout><Outlet/></MainLayout>
}
export default ProtectedRoute
