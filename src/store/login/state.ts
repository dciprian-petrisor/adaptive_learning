export interface LoginStateInterface {
  loggedIn: boolean;
  username: string;
  password: string;
}

function state (): LoginStateInterface {
  return {
    loggedIn: false,
    username: '',
    password: ''
  }
}

export default state
