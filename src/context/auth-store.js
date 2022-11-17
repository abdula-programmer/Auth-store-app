import React, {useState, useEffect} from 'react'

const AuthContext = React.createContext({
   isLoggedIn: false,
   onLogin: (email, password) => {},
   onLogout: () => {}
})




export const AuthContextProvider = (props) => {

   const [isLoggedIn, setIsLoggedIn] = useState(false);


   useEffect(()=> {
      const storedLoginedInfo = localStorage.getItem('isLoggedIn');

      if(storedLoginedInfo === '1'){
        setIsLoggedIn(true);
      }
  },[])


   const loginHandler = (email, password) => {
      localStorage.setItem('isLoggedIn', '1')
      setIsLoggedIn(true);
    };
  
    const logoutHandler = () => {
      localStorage.setItem('isLoggedIn', '0');
      setIsLoggedIn(false);
    };


   return(
      <AuthContext.Provider value={{
         isLoggedIn,
         onLogin: loginHandler,
         onLogout: logoutHandler
      }}>
         {props.children}
      </AuthContext.Provider>
   )
}

export default AuthContext;