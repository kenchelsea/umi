import { Redirect } from 'umi'
import { getToken } from '@/utils/auth';

export default (props:object) => {
  if (getToken()) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}