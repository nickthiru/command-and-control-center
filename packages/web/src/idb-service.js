import Dexie from "dexie";

export default function DB() {

  if (window.indexedDB) {
    console.log("IndexedDB is supported");
  }
  else {
    alert("Indexed DB is not supported!");
  }

  let db = new Dexie("AppDb");

  db.version(1).stores({
    deviceLocations: "deviceId, longitude, latitude"
  });

  db.open();

  return db;
}

