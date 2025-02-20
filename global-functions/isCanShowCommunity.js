const isCanShowCommunity = Variables => {
  const userinfo = Variables.user_info;
  if (
    userinfo != null &&
    userinfo.organization_user != null &&
    userinfo.organization_user.state === 'passed' &&
    userinfo.organization_user.organization != null &&
    (userinfo.organization_user.dismissed_at == 0 ||
      userinfo.organization_user.dismissed_at == null) &&
    userinfo.identity != null &&
    userinfo.is_organization_type_sns_accessible
  ) {
    return true;
  } else {
    return false;
  }
};

export default isCanShowCommunity;
