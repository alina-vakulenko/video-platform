class LocalStorageService {
  static setData(key, data) {
    try {
      const stringData = JSON.stringify(data);
      localStorage.setItem(key, stringData);
    } catch (error) {
      console.error("Set data error: ", error.message);
    }
  }
  static getData(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : undefined;
    } catch (error) {
      console.error("Get data error: ", error.message);
    }
  }
}

export default LocalStorageService;
