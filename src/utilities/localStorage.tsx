const TRACK_DATA = "track_data";

export const getStorageData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    if (data) console.log("dat", data.split("]"));
    if (data && data.split("]").length > 1) {
      console.log("parsed", JSON.parse(data));
      return JSON.parse(data);
    }
    return data;
  } catch {
    return null;
  }
};

export const setStorageData = (key: string, data: string) => {
  try {
    const stringifiedData = JSON.stringify(data);

    localStorage.setItem(key, stringifiedData);

    return data;
  } catch (err) {
    return err;
  }
};

export const updateStorageData = (key: string, data: string) => {
  try {
    const storageData = getStorageData(key);

    let stringifiedData;
    if (storageData && storageData.length) {
      storageData.push(data);
      stringifiedData = JSON.stringify(storageData);
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
