import { UTApi } from "uploadthing/server";

const utapi = new UTApi();
console.log("UTApi instance:", utapi);
console.log("deleteFiles type:", typeof utapi.deleteFiles);
