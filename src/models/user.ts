import { loginDD } from '@/services/login';
import { setToken } from '@/utils/auth';

export default {
  namespace: 'user',
  state: {
    loginState: false,
    token: null,
  },
  // 同步
  reducers: {
    changeLoginState(state:object, { payload }: any) {
      payload.isAuto ? setToken(payload.token, 7) : setToken(payload.token)
      return {
        ...state,
        ...payload
      }
    },
  },
  // 异步
  effects: {
    // 登录
    *login({payload}:any, {call, put}:any){
      let params = {
        username: payload.username,
        password: payload.password,
        loginType: payload.loginType
      }
      // 请求接口
      const res = yield call(loginDD, params)
      let { token } = res.data
      yield put({
        type: 'changeLoginState',
        payload: {
          isAuto: payload.isAuto,
          loginState: true,
          token,
        }
      })
    }
  }
};