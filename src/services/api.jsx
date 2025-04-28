import axios from "axios";

// URL dari Google Apps Script (Setelah Deployment)
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzJgHLVfmfWsfxdgyYVUp0LO-bENC1x8dvrIyGr0mloxJMrxZN87k5JdbOEAJ9kNJId/exec";

export const fetchSheetData = async () => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return [];
  }
};
