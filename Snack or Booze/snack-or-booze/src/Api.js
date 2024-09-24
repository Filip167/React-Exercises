import axios from "axios";

const BASE_API_URL = "http://localhost:5001";

class SnackOrBoozeApi {
  static async getSnacks() {
    try {
      const result = await axios.get(`${BASE_API_URL}/snacks`);
      return result.data;
    } catch (error) {
      console.error("Error fetching snacks:", error);
      throw error;
    }
  }

  static async getDrinks() {
    try {
      const result = await axios.get(`${BASE_API_URL}/drinks`);
      return result.data;
    } catch (error) {
      console.error("Error fetching drinks:", error);
      throw error;
    }
  }
}

export default SnackOrBoozeApi;
