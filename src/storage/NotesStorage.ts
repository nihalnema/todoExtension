// Class to handle the storage of Notes
// To use and instantiate
// import { NotesStorage } from "../storage/NotesStorage";
// new NotesStorage(); and call the functions
export class NotesStorage {
  /**
   * To add a note
   * @param note string to be added in notes
   */
  public addNote(note: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      // get the notes from local storage
      chrome.storage.local.get(["notes"], function (result: any) {
        // storing the array of notes in variable
        let notes: any = result.notes;
        // if its the first element to be added
        if (notes === undefined) {
          // generate a random key for unique id
          let randomkey: number = Math.floor(Math.random() * 10000 + 1);
          //array containing all the notes
          let noteArray: any = [];
          noteArray.push({ id: randomkey, note: note });
          // add the value of notes in local storage
          chrome.storage.local.set({ ["notes"]: noteArray }, function () {
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
          }
          // add the note value in array
          notes.push({ id: randomkey, note: note });
          // add the value of notes in local storage
          chrome.storage.local.set({ ["notes"]: notes }, function () {
            // Promise resolved. Use await in react
            resolve("Added Succesfully");
          });
        }
      });
    });
  }

  /**
   * function to remove a particular note
   * @param key id of note to be deleted
   */
  public removeNote(key: number): Promise<string> {
    return new Promise(function (resolve, reject) {
      //get the value of all the notes
      chrome.storage.local.get(["notes"], function (result) {
        //Store the notes array object
        let notes = result.notes;
        //Search for key in array object
        let obj = notes.find((x) => x.id === key);
        //find index of the matched object
        var index = notes.indexOf(obj);
        //if it exist delete the object from array
        if (index > -1) {
          notes.splice(index, 1);
        }
        //set the updated value after removing the object
        chrome.storage.local.set({ ["notes"]: notes }, function () {
          //Resolve the promise
          resolve("Removed Succesfully");
        });
      });
    });
  }

  /**
   * get all the notes stored in database
   */
  public getNotes(): Promise<any> {
    return new Promise(function (resolve, reject) {
      // get the array of notes from local database
      chrome.storage.local.get(["notes"], function (result) {
        // return array in promise to get it use await
        if(result.notes==undefined)
          resolve([]);
        else
          resolve(result.notes);
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
