import {getItem} from "../util/localStorage";

export default class AutService {

}
export const isRole = (user, role) => {
    user = user || getItem('user');
    if (!user || !user.token) return false;
    return user.roles?.findIndex(r => r === role) !== -1;
}
export const ROLE_USER = 'ROLE_USER';
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_SHOP = 'ROLE_SHOP';