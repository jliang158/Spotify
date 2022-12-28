import React from 'react';
import useAuth from '../useAuth';
const Dashboard = (props: any) => {
  const {code} = props;
  const accessToken = useAuth(code)
  return (
    <div>
      {code}
    </div>
  )
}

export default Dashboard;