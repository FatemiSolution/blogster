import configue from "../configue/configue";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    Client = new Client();
    Account;
    constructor(){
        this.Client()
        .setEndpoint(configue.appwrite_url)
        .setLocale(configue.project_id);
        this.Account = new Account(this.Client);
    }
    async createAccount({email,pasword,name}){
        try {
            const userAccount= await this.Account.create(ID.unique(),email,pasword,name);
            if(userAccount){
                // run another method for directr login
                this.login(email,pasword);
            }else{
                return userAccount // incase the value is null then we will work accordingly
            }
        } catch (error) {
           throw error; 
        }
    }
    async login({email,password}){
        try {
          return  await this.Account.createEmailSession(email,password);
        } catch (error) {
           throw error; 
        }
    }
    async getCurrentuser(){
        try {
            return await this.Account.get();
        } catch (error) {
            console.log('there is an error while getting Current user')
        }
    }
}

const authService = new AuthService();

export default authService;