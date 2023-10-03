import configue from "../configue/configue";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class DatabaseService{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(configue.appwrite_url)
        .setProject(configue.project_id);

       this.databases = new Databases(this.client);
       this.storage = new Storage(this.client);
    }
    async createPost({title,slug,featuredImage,content,status,userID}){
        try {
            return await this.databases.createDocument(configue.database_id,configue.collection_id,ID.unique(),{
                content,
                title,
                featuredImage,
                status,
                userID
            })
        } catch (error) {
            console.log('there is an error while creating Post',error);
        }
    }
    async updatePost(slug,{title,featuredImage,content,status}){
        try {
            return await this.databases.updateDocument(configue.database_id,configue.collection_id,slug,{
                title,
                content,
                featuredImage,
                status,
                
            })
        } catch (error) {
            console.log('there is an error while updating Post', error)
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(configue.database_id,configue.collection_id,slug)
            return true
        } catch (error) {
            console.log('there is an error while deleting Post',error)
            return false
        }
    }
    async getPost(slug){
        try {
           return await this.databases.getDocument(configue.database_id,configue.collection_id,slug)
        } catch (error) {
            console.log("there is an error while getting Post", error)
            return false
        }
    }
    async getlistPost(slug){
        try {
           return await this.databases.listDocuments(configue.database_id,configue.collection_id)
        } catch (error) {
            console.log('there is an error while getting all post', error)
            return false
        }
    }


}

const databaseService = new DatabaseService();
export default databaseService;