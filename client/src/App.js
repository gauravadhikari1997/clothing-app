import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "./redux/selectors/user.selectors";

import { GlobalStyle } from "./global.styles";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";

const Collection = lazy(() =>
  import("./pages/collection/collection.component")
);
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

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
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/shop" component={ShopPage}></Route>
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          ></Route>
          <Route path="/checkout" component={CheckoutPage}></Route>
          <Route path="/shop/:title" component={Collection}></Route>
        </Suspense>
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
