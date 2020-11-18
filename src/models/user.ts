
import { loginDD } from '@/services/login';
export default {
  namespace: 'user',
  state: {
    tabIndex2: 'article'
  },
  // 同步
  reducers: {
    setTab(state, { payload: name }) {
      console.log('setTab');
    },
  },
  // 异步
  effects: {
    login({payload}, effects){
      console.log('login', payload);
      loginDD(payload).then(res=>{
        // let { token }= res.data
        console.log(res);
        
      })
    }
  }
};