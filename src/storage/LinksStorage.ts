// Class to handle the storage of Links
// To use and instantiate
// import { LinksStorage } from "../storage/LinksStorage";
// new LinksStorage(); and call the functions
export class LinksStorage {
    /**
     * To add a link
     * @param title title of the link
     * @param url url of the link
     */
    public addLink(title: string, url:string): Promise<string> {
      return new Promise(function (resolve, reject) {
        // get the links from local storage
        chrome.storage.local.get(["links"], function (result: any) {
          // storing the array of links in variable
          let links: any = result.links;
          // if its the first element to be added
          if (links === undefined) {
            // generate a random key for unique id
            let randomkey: number = Math.floor(Math.random() * 10000 + 1);
            //array containing all the links
            let linkArray: any = [];
            linkArray.push({ id: randomkey, title: title, url:url });
            // add the value of links in local storage
            chrome.storage.local.set({ ["links"]: linkArray }, function () {
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
            }
            // add the link value in array
            links.push({ id: randomkey, title: title, url:url });
            // add the value of links in local storage
            chrome.storage.local.set({ ["links"]: links }, function () {
              // Promise resolved. Use await in react
              resolve("Added Succesfully");
            });
          }
        });
      });
    }
  
    /**
     * function to remove a particular link
     * @param key id of link to be deleted
     */
    public removeLink(key: number): Promise<string> {
      return new Promise(function (resolve, reject) {
        //get the value of all the links
        chrome.storage.local.get(["links"], function (result) {
          //Store the links array object
          let links = result.links;
          //Search for key in array object
          let obj = links.find((x) => x.id === key);
          //find index of the matched object
          var index = links.indexOf(obj);
          //if it exist delete the object from array
          if (index > -1) {
            links.splice(index, 1);
          }
          //set the updated value after removing the object
          chrome.storage.local.set({ ["links"]: links }, function () {
            //Resolve the promise
            resolve("Removed Succesfully");
          });
        });
      });
    }
  
    /**
     * get all the links stored in database
     */
    public getLinks(): Promise<any> {
      return new Promise(function (resolve, reject) {
        // get the array of links from local database
        chrome.storage.local.get(["links"], function (result) {
          // return array in promise to get it use await
          resolve(result.links);
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
  