const TRACK_DATA = "track_data";

export const getStorageData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch {
    return null;
  }
};

export const updateStorageData = (key: string, data: string) => {
  try {
    const storageData = getStorageData(key);

    let stringifiedData;
    console.log("data", storageData, "key", key);
    if (storageData && storageData.length) {
      storageData.push(data);
      stringifiedData = JSON.stringify(storageData);
      console.log("STRINGI", stringifiedData);
      localStorage.setItem(key, stringifiedData);
      return stringifiedData;
    }

    const arr = [];
    arr.push(data);
    stringifiedData = JSON.stringify(arr);
    localStorage.setItem(key, stringifiedData);
    return stringifiedData;
  } catch (err) {
    return err;
  }
};

export const removeStorageData = () => {
  try {
    localStorage.removeItem(TRACK_DATA);
    return;
  } catch {
    return null;
  }
};
