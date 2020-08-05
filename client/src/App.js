import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "./redux/selectors/user.selectors";

import { GlobalStyle } from "./global.styles";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Checkout from "./pages/checkout/checkout.component";
import Collection from "./pages/collection/collection.component";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    function setAuth() {
      const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot((snapShot) => {
            dispatch({
              type: "SET_CURRENT_USER",
              payload: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            });
          });
        } else {
          //set current user state to null
          dispatch({ type: "SET_CURRENT_USER", payload: userAuth });
        }
      });
      return () => unsubscribe();
    }
    setAuth();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/shop" component={ShopPage}></Route>
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        ></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/shop/:title" component={Collection}></Route>
      </Switch>
    </>
  );
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
// });

// OLD3
// const mapStateToProps = (state) = ({
//   currentUser: selectCurrentUser(state)
// })
// OLD2
// const mapStateToProps = (state) = ({
//   currentUser: state.currentUser
// })
// OLD1
// const mapStateToProps = ({currentUser}) = ({
//   currentUser
// })

// const mapDispatchToProps = (dispatch) => ({ dispatch });

export default App;
