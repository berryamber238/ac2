const myFunctionName = Variables => {
  const data = Variables.user_info;

  if (data) {
    if (data.organization_user) {
      if (data.organization_user.state === 'pending') {
        //审核中
        return 3; //审核中
      } else if (
        data.organization_user.state === 'passed' &&
        data.organization_user.organization &&
        !data.organization_user.dismissed_at
      ) {
        //有权限
        if (data.is_organization_type_minute_accessible) {
          //有权限
          return 0; //有权限
        } else {
          //无权限
          return 4; //无权限
        }
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

export default myFunctionName;
