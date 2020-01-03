import * as React from "react";
import { firebase } from "../firebase";
import { AuthUserContext } from "./AuthUserContext";

interface IInterfaceProps {
  authUser?: any;
}

interface IInterfaceState {
  authUser?: any;
}

export const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<
    IInterfaceProps,
    IInterfaceState
  > {
    constructor(props: any) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    public componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    public render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }
  return WithAuthentication;
};
