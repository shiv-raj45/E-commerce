import React, { useEffect ,lazy} from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import axios from "axios";
import { ProductState } from "./Context/Context";
import "./components/Css/App.css";
import Suspenser from "./components/Suspenser";
const Login=lazy(()=>import ("./components/Login"));
const Header=lazy(()=>import ('./components/Header') )
const SignupForm=lazy(()=>import ('./components/SignupForm'));
const Home=lazy(()=>import ('./components/Home'))
const Cart=lazy(()=>import ('./components/Cart'))
const SearchPage=lazy(()=>import ('./components/SearchPage'));
const WishList=lazy(()=>import ('./components/WishList'))
const CategoryFilter=lazy(()=>import ('./components/CategoryFilter'))
const ProductDetails=lazy(()=>import ('./components/ProductDetails'))
const ChangePassword=lazy(()=>import('./components/ChangePassword'))
const Account=lazy(()=>import('./components/Account'))
const AccountControls=lazy(()=>import('./components/AccountControls'))
const Footer=lazy(()=>import('./components/Footer'))
const PageNotFound=lazy(()=>import('./components/PageNotFound'))

function App() {
const {dispatch,state}= ProductState()
useEffect(() => {
    axios
      .get("http://localhost:2000/auth", {
        headers: { authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        if (!res.data.error) {
          dispatch({ type: "AUTH", payload:{auth:true,userName:res.data.userName,email:res.data.email,id:res.data.id}});
        }
      })
    
      const authKey = localStorage.getItem("accessToken")

      if (authKey) {
        dispatch({ type: "AUTH", payload:{auth:true}});
      } else {
        dispatch({ type: "AUTH", payload: {auth:false} });
      }


    
    },[dispatch])
  
  return (
    <div className="App">
<React.Suspense fallback={<Suspenser/>}>

      <Header />

      <Switch>
        <Route exact path={["/home","/"]} component={Home} />

        <Route exact path={`/searchpage`} component={SearchPage} />
        <Route exact path="/cart" component={Cart} />
       
        <Route exact path={`/searchpage/:keyword`} component={SearchPage} />
        <Route exact path="/wishlist" component={WishList} />
        <Route exact path="/category/:id" component={CategoryFilter} />
        <Route exact path="/productDetails/:id" component={ProductDetails} />
        <Route exact path="/changepassword" component={ChangePassword} />

        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/login" component={Login} />
     {state.id?<Route exact path="/profile" component={Account} />:<Redirect to="/"/> }
        <Route exact path="/profile/:accountControls" component={AccountControls} />
        <Route  component={PageNotFound} />
 
 </Switch>
<Footer/>

 </React.Suspense>


    </div>
  );
}

export default App;
