import {useAppDispatch, useAppSelector} from "../store/Store.ts";
import { _signIn, _signOut, _updateUser } from "../store/slices/AuthSlice.ts";
import UserModel from "../network/models/UserModel.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const navigate = useNavigate()

  function signOut() {
    dispatch(_signOut());
  }

  function signIn(user: UserModel) {
    dispatch(_signIn(user));
  }

  function updateUser(user: Partial<UserModel>) {
    dispatch(_updateUser(user));
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [user])

  return {
    user,
    signIn,
    signOut,
    updateUser,
  };
}
