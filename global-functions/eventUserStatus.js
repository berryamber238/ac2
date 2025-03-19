const eventUserStatus = Variables => {
  const data = Variables.user_info;
  if (data != null) {
    if (data.organization_user) {
      if (data.organization_user.state === 'pending') {
        //审核中
        return 3; //审核中
      } else if (
        data.organization_user.state === 'passed' &&
        data.organization_user.organization &&
        !data.organization_user.dismissed_at
      ) {
        //审核通过未离职
        return 0; //已认证
      } else {
        return 2; //未认证
      }
    } else {
      return 2; //未认证
    }
  } else {
    return 1; //未登录
  }
};

export default eventUserStatus;
