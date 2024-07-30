import { API_PATH } from './config';
import axios from 'axios';

const metadata = accessToken => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  };
};

const handleRequest = async request => {
  try {
    const response = await request();
    return response.data;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to handle it further if needed
  }
};

export const Api = {
  // get /todos/todo/ 에서 시작날과 끝날 입력 형식은 뭐지 일단 userId만!
  /**
   * 서버로부터 사용자의 todo를 받아온다.
   *
   */
  fetchTodos: ({ accessToken, userId }) => {
    return handleRequest(() =>
      axios.get(`${API_PATH.todos}?user_id=${userId}`, metadata(accessToken)),
    );
  },
  /**
   * 서버에 새로운 할 일을 추가합니다.
   *
   * @param {Object} params - 요청에 필요한 매개변수.
   * @param {string} params.accessToken - 인증을 위한 액세스 토큰.
   * @param {Object} params.todoData - 추가할 할 일의 데이터.
   * @param {string} params.todoData.content - 할 일의 내용.
   * @param {number} params.todoData.categoryId - 할 일의 카테고리 ID.
   * @param {string} params.todoData.startDate - 할 일의 시작 날짜 (YYYY-MM-DD 형식).
   * @param {string} params.todoData.endDate - 할 일의 종료 날짜 (YYYY-MM-DD 형식).
   * @param {number} params.todoData.userId - 할 일과 연관된 사용자 ID.
   * @param {string} params.todoData.order - 할 일의 순서 문자열.
   * @param {boolean} params.todoData.isCompleted - 할 일의 완료 여부.
   * @returns {Promise<Object>} 새로 추가된 할 일 객체를 반환하는 프로미스.
   * @throws {Error} 요청이 실패할 경우 에러를 던집니다.
   */
  addTodo: ({ accessToken, todoData }) => {
    return handleRequest(() =>
      axios.post(API_PATH.todos, todoData, metadata(accessToken)),
    );
  },
  /**
   * 이 함수는 todo를 삭제하는 함수입니다.
   * * 요청 본문 형식:
   * {
   *   "todo_id": 0
   * }
   *
   * 반환되는 객체 형식:
   * @property {number} id - 삭제된 할 일의 ID.
   * @property {string} content - 삭제된 할 일의 내용.
   * @property {number} categoryId - 삭제된 할 일의 카테고리 ID.
   * @property {string} [startDate] - 삭제된 할 일의 시작 날짜 (YYYY-MM-DD 형식).
   * @property {string} [endDate] - 삭제된 할 일의 종료 날짜 (YYYY-MM-DD 형식).
   * @property {number} userId - 삭제된 할 일의 사용자 ID.
   * @property {string} order - 삭제된 할 일의 순서.
   * @property {boolean} isCompleted - 삭제된 할 일의 완료 여부.
   */
  deleteTodo: ({ accessToken, todoId }) => {
    return handleRequest(() =>
      axios.request({
        url: API_PATH.todos,
        method: 'DELETE',
        headers: metadata(accessToken),
        data: { todo_id: todoId },
      }),
    );
  },
  /**
   * 서버에서 할 일의 정보를 업데이트합니다.
   *
   * @param {Object} params - 요청에 필요한 매개변수.
   * @param {string} params.accessToken - 인증을 위한 액세스 토큰.
   * @param {Object} params.updateData - 업데이트할 할 일의 데이터.
   * @param {number} params.updateData.id - 업데이트할 할 일의 ID (필수).
   * @param {string} [params.updateData.content] - 할 일의 새로운 내용 (선택적).
   * @param {number} [params.updateData.categoryId] - 할 일의 새로운 카테고리 ID (선택적).
   * @param {string} [params.updateData.startDate] - 할 일의 새로운 시작 날짜 (YYYY-MM-DD 형식, 선택적).
   * @param {string} [params.updateData.endDate] - 할 일의 새로운 종료 날짜 (YYYY-MM-DD 형식, 선택적).
   * @param {string} [params.updateData.order] - 할 일의 새로운 순서 (선택적).
   * @param {boolean} [params.updateData.isCompleted] - 할 일의 새로운 완료 여부 (선택적).

   * 응답 객체 형식:
   * @property {number} id - 업데이트된 할 일의 ID.
   * @property {string} content - 업데이트된 할 일의 내용.
   * @property {number} categoryId - 업데이트된 할 일의 카테고리 ID.
   * @property {string} [startDate] - 업데이트된 할 일의 시작 날짜 (YYYY-MM-DD 형식).
   * @property {string} [endDate] - 업데이트된 할 일의 종료 날짜 (YYYY-MM-DD 형식).
   * @property {number} userId - 업데이트된 할 일의 사용자 ID.
   * @property {string} order - 업데이트된 할 일의 순서.
   * @property {boolean} isCompleted - 업데이트된 할 일의 완료 여부.
   */
  updateTodo: ({ accessToken, updateData }) => {
    return handleRequest(() =>
      axios.patch(API_PATH.todos, updateData, metadata(accessToken)),
    );
  },
  /**
   * 서버에 토큰을 검증 요청을 보냅니다.
   *
   * 요청 본문 형식:
   * {
   *   "token": "your_accessToken_here"
   * }
   */
  verifyToken: token => {
    return handleRequest(() => axios.post(API_PATH.verify, { token }));
  },
  /**
   * Google 로그인 요청을 서버에 보냅니다.
   *
   * @param {Object} tokenData - 로그인에 필요한 토큰 데이터.
   * @param {string} tokenData.token - Google 인증 토큰.
   * @param {string} tokenData.deviceToken - 장치 토큰.

   */
  googleLogin: tokenData => {
    return handleRequest(() => axios.post(API_PATH.login, tokenData));
  },

  getUserInfo: accessToken => {
    return handleRequest(() => axios.get(API_PATH.user, metadata(accessToken)));
  },

  getCategory: (accessToken, userId) => {
    return handleRequest(() =>
      axios.get(`${API_PATH.categories}?user_id=${userId}`),
    );
  },

  /**
   * 서버에 카테고리를 추가합니다.
   *
   * @example
   * // categoryData 예시:
   * {
   *   title: "categoryName",
   *   userId: userId, // int
   *   color: "selectedColor"
   *   order: 일단 프론트에서 보내기 //int
   * }
   */
  addCategory: (accessToken, categoryData) => {
    return handleRequest(() =>
      axios.post(API_PATH.category, categoryData, metadata(accessToken)),
    );
  },
};
