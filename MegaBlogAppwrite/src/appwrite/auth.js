import { conf } from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //!CreateAccount method
  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );
    if (userAccount) {
      // Call another method login
      return this.login({email,password})
    } else {
      return userAccount;
    }
  }

  //!Login Method
  async login({email,password}){
   return await this.account.createEmailPasswordSession(email,password)
  }
//!getCurrentUser Method
  async getCurrentUser(){
    await this.account.get()
  }

  //!Logout Method

  async logout(){
    return await this.account.deleteSession()
  }
}





export const authService = new AuthService(); //authservice is my object of class AUthservice
