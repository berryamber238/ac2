class MemberChange {
  constructor(
    type,
    uid,
    status,
    logo,
    name,
    companyName,
    identity,
    position,
    chatMessageBean
  ) {
    this.type = type;
    this.uid = uid;
    this.status = status;
    this.logo = logo;
    this.name = name;
    this.companyName = companyName;
    this.identity = identity;
    this.position = position;
    this.chatMessageBean = chatMessageBean;
  }

  static fromTypeAndChatMessageBean(type, chatMessageBean) {
    return new MemberChange(
      type,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      chatMessageBean
    );
  }

  static fromTypeUidAndStatus(type, uid, status) {
    return new MemberChange(
      type,
      uid,
      status,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  static fromTypeUidAndName(type, uid, name) {
    return new MemberChange(
      type,
      uid,
      null,
      null,
      name,
      null,
      null,
      null,
      null
    );
  }

  static fromTypeUidNameAndStatus(type, uid, name, status) {
    return new MemberChange(
      type,
      uid,
      status,
      null,
      name,
      null,
      null,
      null,
      null
    );
  }

  static fromTypeLogoNameCompanyIdentityAndPosition(
    type,
    logo,
    name,
    companyName,
    identity,
    position
  ) {
    return new MemberChange(
      type,
      null,
      null,
      logo,
      name,
      companyName,
      identity,
      position,
      null
    );
  }
}

export default MemberChange;
