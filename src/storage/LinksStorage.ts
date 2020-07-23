// Class to handle the storage of Links
// To use and instantiate
// import { LinksStorage } from "../storage/LinksStorage";
// new LinksStorage(); and call the functions
export class LinksStorage {

  /**
   * To add a folder conatining links
   * @param folderName name of folder to be added
   */
  public addFolder(folderName: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      // get the links folder from local storage
      chrome.storage.local.get(["linksFolder"], function (result: any) {
        // storing the array of links folder in variable
        let linksFolder: any = result.linksFolder;
        // if its the first folder to be added
        if (linksFolder === undefined) {
          // generate a random key for unique id
          let randomkey: number = Math.floor(Math.random() * 10000 + 1);
          //array containing all the links folder
          let folderArray: any = [];
          folderArray.push({ id: randomkey, folderName: folderName });
          // add the value of links folder in local storage
          chrome.storage.local.set({ ["linksFolder"]: folderArray }, function () {
            // Promise resolved. Use await in react
            resolve("Folder Added Succesfully");
          });
        } else {
          // generate a random key
          let randomkey: number = Math.floor(Math.random() * 10000 + 1);
          // check if the object corresponding to the key generated exists
          let obj = linksFolder.find((x) => x.id === randomkey);
          // generate keys uptil its not already present
          while (obj != undefined) {
            randomkey = Math.floor(Math.random() * 10000 + 1);
            // check if the object corresponding to the key generated exists
            obj = linksFolder.find((x) => x.id === randomkey);
          }
          // add the link value in array
          linksFolder.push({ id: randomkey, folderName: folderName });
          // add the value of links folder in local storage
          chrome.storage.local.set({ ["linksFolder"]: linksFolder }, function () {
            // Promise resolved. Use await in react
            resolve("Folder Added Succesfully");
          });
        }
      });
    });
  }

  /**
   * get all the folder stored in database
   */
  public getFolder(): Promise<any> {
    return new Promise(function (resolve, reject) {
      // get the array of links folder from local database
      chrome.storage.local.get(["linksFolder"], function (result) {
        // return array in promise to get it use await
        if(result.linksFolder==undefined)
          resolve([]);
        else
          resolve(result.linksFolder);
      });
    });
  }

  /**
   * function to remove a particular link folder
   * @param id id of link folder to be deleted
   */
  public removeFolder(folderId:number): Promise<string> {
    return new Promise(function (resolve, reject) {
      let key='link' + folderId.toString();
      //get the value of all the links folder
      chrome.storage.local.get(["linksFolder"], function (result) {
        //Store the links folder array object
        let linksFolder = result.linksFolder;
        //Search for key in array object
        let obj = linksFolder.find((x) => x.id === folderId);
        //find index of the matched object
        var index = linksFolder.indexOf(obj);
        //if it exist delete the object from array
        if (index > -1) {
          linksFolder.splice(index, 1);
          //remove all the links corresponding to folder
          chrome.storage.local.set({ [key]: undefined }, function () {});
        }
        //set the updated value after removing the object
        chrome.storage.local.set({ ["linksFolder"]: linksFolder }, function () {
          //Resolve the promise
          resolve("Removed Succesfully");
        });
      });
    });
  }

    /**
     * To add a link
     * @param folderId ID of folder in which link is to be added
     * @param title title of the link
     * @param url url of the link
     */
    public addLink(folderId:number,title: string, url:string): Promise<string> {
      return new Promise(function (resolve, reject) {
        let key='link' + folderId.toString();
        // get the links from local storage
        chrome.storage.local.get([key], function (result: any) {
          // storing the array of links in variable
          let links: any = result[key];
          // if its the first element to be added
          if (links === undefined) {
            // generate a random key for unique id
            let randomkey: number = Math.floor(Math.random() * 10000 + 1);
            //array containing all the links
            let linkArray: any = [];
            linkArray.push({ id: randomkey, title: title, url:url });
            // add the value of links in local storage
            chrome.storage.local.set({ [key]: linkArray }, function () {
              // Promise resolved. Use await in react
              resolve("Added Succesfully");
            });
          } else {
            // generate a random key
            let randomkey: number = Math.floor(Math.random() * 10000 + 1);
            // check if the object corresponding to the key generated exists
            let obj = links.find((x) => x.id === randomkey);
            // generate keys uptil its not already present
            while (obj != undefined) {
              randomkey = Math.floor(Math.random() * 10000 + 1);
              obj = links.find((x) => x.id === randomkey);
            }
            // add the link value in array
            links.push({ id: randomkey, title: title, url:url });
            // add the value of links in local storage
            chrome.storage.local.set({ [key]: links }, function () {
              // Promise resolved. Use await in react
              resolve("Added Succesfully");
            });
          }
        });
      });
    }
  
    /**
     * function to remove a particular link
     * @param folderId  ID of folder from which link is to be removed 
     * @param id id of link to be deleted
     */
    public removeLink(folderId:number,id: number): Promise<string> {
      return new Promise(function (resolve, reject) {
        let key='link' + folderId.toString();
        //get the value of all the links
        chrome.storage.local.get([key], function (result) {
          //Store the links array object
          let links = result[key];
          //Search for key in array object
          let obj = links.find((x) => x.id === id);
          //find index of the matched object
          var index = links.indexOf(obj);
          //if it exist delete the object from array
          if (index > -1) {
            links.splice(index, 1);
          }
          //set the updated value after removing the object
          chrome.storage.local.set({ [key]: links }, function () {
            //Resolve the promise
            resolve("Removed Succesfully");
          });
        });
      });
    }
  
    /**
     * get all the links stored in database
     * @param folderId ID of folder containing links 
     */
    public getLinks(folderId:number): Promise<any> {
      return new Promise(function (resolve, reject) {
        let key='link' + folderId.toString();
        // get the array of links from local database
        chrome.storage.local.get([key], function (result) {
          // return array in promise to get it use await
          if(result[key]==undefined)
          resolve([]);
        else
          resolve(result[key]);
        });
      });
    }
  
    /**
     * To clear the memory in local storage
     */
    public clearMemory() {
      chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
      });
    }
  }
  