// Class to handle the storage of Notes
// To use and instantiate
// import { NotesStorage } from "../storage/NotesStorage";
// new NotesStorage(); and call the functions
export class NotesStorage {

  /**
   * To add a folder conatining notes
   * @param folderName name of folder to be added
   */
  public addFolder(folderName: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      // get the notes folder from local storage
      chrome.storage.local.get(["notesFolder"], function (result: any) {
        // storing the array of notes folder in variable
        let notesFolder: any = result.notesFolder;
        // if its the first folder to be added
        if (notesFolder === undefined) {
          // generate a random key for unique id
          let randomkey: number = Math.floor(Math.random() * 10000 + 1);
          //array containing all the notes folder
          let folderArray: any = [];
          folderArray.push({ id: randomkey, folderName: folderName });
          // add the value of notes folder in local storage
          chrome.storage.local.set({ ["notesFolder"]: folderArray }, function () {
            // Promise resolved. Use await in react
            resolve("Folder Added Succesfully");
          });
        } else {
          // generate a random key
          let randomkey: number = Math.floor(Math.random() * 10000 + 1);
          // check if the object corresponding to the key generated exists
          let obj = notesFolder.find((x) => x.id === randomkey);
          // generate keys uptil its not already present
          while (obj != undefined) {
            randomkey = Math.floor(Math.random() * 10000 + 1);
            // check if the object corresponding to the key generated exists
            obj = notesFolder.find((x) => x.id === randomkey);
          }
          // add the note value in array
          notesFolder.push({ id: randomkey, folderName: folderName });
          // add the value of notes folder in local storage
          chrome.storage.local.set({ ["notesFolder"]: notesFolder }, function () {
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
      // get the array of notes folder from local database
      chrome.storage.local.get(["notesFolder"], function (result) {
        // return array in promise to get it use await
        if(result.notesFolder==undefined)
          resolve([]);
        else
          resolve(result.notesFolder);
      });
    });
  }

  /**
   * function to remove a particular note folder
   * @param id id of note folder to be deleted
   */
  public removeFolder(folderId:number): Promise<string> {
    return new Promise(function (resolve, reject) {
      let key='note' + folderId.toString();
      //get the value of all the notes folder
      chrome.storage.local.get(["notesFolder"], function (result) {
        //Store the notes folder array object
        let notesFolder = result.notesFolder;
        //Search for key in array object
        let obj = notesFolder.find((x) => x.id === folderId);
        //find index of the matched object
        var index = notesFolder.indexOf(obj);
        //if it exist delete the object from array
        if (index > -1) {
          notesFolder.splice(index, 1);
          //remove all the notes corresponding to folder
          chrome.storage.local.set({ [key]: undefined }, function () {});
        }
        //set the updated value after removing the object
        chrome.storage.local.set({ ["notesFolder"]: notesFolder }, function () {
          //Resolve the promise
          resolve("Removed Succesfully");
        });
      });
    });
  }

  /**
   * To add a note in particular folder
   * @param folderId Id of folder in which notes are to be added
   * @param note string to be added in notes
   */
  public addNote(folderId:number,note: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      let key='note' + folderId.toString();
      // get the notes from local storage
      chrome.storage.local.get([key], function (result: any) {
        // storing the array of notes in variable
        let notes: any = result[key];
        // if its the first element to be added
        if (notes === undefined) {
          // generate a random key for unique id
          let randomkey: number = Math.floor(Math.random() * 10000 + 1);
          //array containing all the notes
          let noteArray: any = [];
          noteArray.push({ id: randomkey, note: note });
          // add the value of notes in local storage
          chrome.storage.local.set({ [key]: noteArray }, function () {
            // Promise resolved. Use await in react
            resolve("Added Succesfully");
          });
        } else {
          // generate a random key
          let randomkey: number = Math.floor(Math.random() * 10000 + 1);
          // check if the object corresponding to the key generated exists
          let obj = notes.find((x) => x.id === randomkey);
          // generate keys uptil its not already present
          while (obj != undefined) {
            randomkey = Math.floor(Math.random() * 10000 + 1);
            obj = notes.find((x) => x.id === randomkey);
          }
          // add the note value in array
          notes.push({ id: randomkey, note: note });
          // add the value of notes in local storage
          chrome.storage.local.set({ [key]: notes }, function () {
            // Promise resolved. Use await in react
            resolve("Added Succesfully");
          });
        }
      });
    });
  }

  /**
   * function to remove a particular note from a folder
   * @param folderId Id of folder from which notes are to be removed
   * @param id id of note to be deleted
   */
  public removeNote(folderId:number,id: number): Promise<string> {
    return new Promise(function (resolve, reject) {
      let key='note' + folderId.toString();
      //get the value of all the notes
      chrome.storage.local.get([key], function (result) {
        //Store the notes array object
        let notes = result[key];
        //Search for key in array object
        let obj = notes.find((x) => x.id === id);
        //find index of the matched object
        var index = notes.indexOf(obj);
        //if it exist delete the object from array
        if (index > -1) {
          notes.splice(index, 1);
        }
        //set the updated value after removing the object
        chrome.storage.local.set({ [key]: notes }, function () {
          //Resolve the promise
          resolve("Removed Succesfully");
        });
      });
    });
  }

  /**
   * get all the notes stored in database from a particular folder
   * @param folderId id of folder from which notes are to be get
   */
  public getNotes(folderId:number): Promise<any> {
    return new Promise(function (resolve, reject) {
      let key='note' + folderId.toString();
      // get the array of notes from local database
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
