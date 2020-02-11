import Cookies from 'universal-cookie';

export function isAuthenticated(){
    const cookies = new Cookies();
    const jwt =  cookies.get('jwt');
    if (!jwt) return false;
    else return true;
}

export function getUserEmail(){
    const cookies = new Cookies();
    return cookies.get('email');
}
export function getUserName(){
    const cookies = new Cookies();
    return cookies.get('name');
}

export function deleteUser(){
    const cookies = new Cookies();
    cookies.remove('name');
    cookies.remove('email');
    cookies.remove('jwt');
}

export function loginResponse(){
    const cookies = new Cookies();
    cookies.set('email','paulr@sabrerealtygroup.com');
    cookies.set('name', 'Paul Piedra');
    cookies.set('jwt','dj39fjtyzRwiD09');
}
