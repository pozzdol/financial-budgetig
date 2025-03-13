import axios from "axios";

// URL dari Google Apps Script (Setelah Deployment)
const GOOGLE_SCRIPT_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgfGxAXb0tedUhO9-qGJURfXpZGKYEeveZpzplqN1TQZXbveAFRVY8lu7MfAn4wBhXejlCkRhyAnkPBYFCPiTYJhZkgRp3xKZmKOfvg_02cKwoWqtGMa8s5JNOE4cpTOANo_ffF_YQjmpiBpvF5rXDwDYp810Rm6EVaSSJEZd1iDO1CpYYdQMA3rZ8EUaVftHkJp9P0b4rGXXCoh1el_Lz6mJXsw9PDJuBSNTv84QxWcK509puXl8Y0YbVqeZhuBJTQ1ndHDoNONmlAPmBV11-yuAtKlTSGnWxuy5FL&lib=MghHWd8IohWBD6kg1AwFs-jZ9wbAprOwi";

export const fetchSheetData = async () => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return [];
  }
};
