import { USER_DATA } from "../../contants/sessionStorageKeys/sessionStorageKeys";
import { UserData } from "../../types/UserData/UserData";




export async function brCodeController () {

        const userData:UserData = JSON.parse(sessionStorage.getItem(USER_DATA) ?? '{}');
    
        return userData.brCode;

}

