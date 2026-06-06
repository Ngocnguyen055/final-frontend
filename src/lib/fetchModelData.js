// Khai báo địa chỉ gốc của Backend
const BASE_URL = "http://localhost:8081";

/**
 *
 * @param {string} path - Đường dẫn API (ví dụ: '/user/list', '/user/user1')
 * @returns {Promise} - Trả về một Promise chứa dữ liệu JSON
 */
function fetchModel(path) {
  const fullUrl = `${BASE_URL}${path}`;

  return fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Lỗi khi fetch dữ liệu:", error);
      throw error;
    });
}

export default fetchModel;
