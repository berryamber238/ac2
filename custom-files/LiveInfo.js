class LiveInfo {
  constructor(
    id,
    state,
    userId,
    vendor,
    meeting,
    userType,
    demo,
    superModerator,
    canUploadBackground,
    background,
    help,
    description,
    enDescription,
    scDescription,
    screenShareUserId,
    appId,
    privilegeExpiredTs,
    role,
    rtc,
    rtm,
    liveState,
    liveType,
    liveExperts,
    cover,
    pauseCover,
    liveStateEvents,
    logo,
    name,
    userScore,
    userFullName,
    userNickname,
    scOrganizationName,
    enOrganizationName,
    organizationScore,
    organizationTypeId,
    positionName,
    primaryUsers,
    settings,
    rtmpPlayUrls,
    reminderedAt,
    connector,
    livePreviewFiles,
    announcement,
    allowPublicChannel,
    monitor
  ) {
    this.id = id;
    this.state = state;
    this.userId = userId;
    this.vendor = vendor;
    this.meeting = meeting;
    this.userType = userType;
    this.demo = demo;
    this.superModerator = superModerator;
    this.canUploadBackground = canUploadBackground;
    this.background = background;
    this.help = help;
    this.description = description;
    this.enDescription = enDescription;
    this.scDescription = scDescription;
    this.screenShareUserId = screenShareUserId;
    this.appId = appId;
    this.privilegeExpiredTs = privilegeExpiredTs;
    this.role = role;
    this.rtc = rtc;
    this.rtm = rtm;
    this.liveState = liveState;
    this.liveType = liveType;
    this.liveExperts = liveExperts;
    this.cover = cover;
    this.pauseCover = pauseCover;
    this.liveStateEvents = liveStateEvents;
    this.logo = logo;
    this.name = name;
    this.userScore = userScore;
    this.userFullName = userFullName;
    this.userNickname = userNickname;
    this.scOrganizationName = scOrganizationName;
    this.enOrganizationName = enOrganizationName;
    this.organizationScore = organizationScore;
    this.organizationTypeId = organizationTypeId;
    this.positionName = positionName;
    this.primaryUsers = primaryUsers;
    this.settings = settings;
    this.rtmpPlayUrls = rtmpPlayUrls;
    this.reminderedAt = reminderedAt;
    this.connector = connector;
    this.livePreviewFiles = livePreviewFiles;
    this.announcement = announcement;
    this.allowPublicChannel = allowPublicChannel;
    this.monitor = monitor;
  }
}

class DictChild {
  constructor(
    id,
    name,
    value,
    phone,
    code,
    lower,
    upper,
    unit,
    currency,
    description,
    type,
    priority,
    enTypeName,
    scTypeName,
    tcTypeName,
    enDescription,
    scDescription,
    tcDescription,
    eventTypeGroup
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.phone = phone;
    this.code = code;
    this.lower = lower;
    this.upper = upper;
    this.unit = unit;
    this.currency = currency;
    this.description = description;
    this.type = type;
    this.priority = priority;
    this.enTypeName = enTypeName;
    this.scTypeName = scTypeName;
    this.tcTypeName = tcTypeName;
    this.enDescription = enDescription;
    this.scDescription = scDescription;
    this.tcDescription = tcDescription;
    this.eventTypeGroup = eventTypeGroup;
  }
}

class Connector {
  constructor(title, onlineState) {
    this.title = title;
    this.onlineState = onlineState;
  }
}

class FileInfo {
  constructor(id, liveId, transferStatus, fileName, previewInfo) {
    this.id = id;
    this.liveId = liveId;
    this.transferStatus = transferStatus;
    this.fileName = fileName;
    this.previewInfo = previewInfo;
  }
}

class Announcement {
  constructor(key, content) {
    this.key = key;
    this.content = content;
  }
}

class Meeting {
  constructor(
    id,
    free,
    originalPrice,
    currentPrice,
    eventId,
    startTime,
    endTime,
    eventName,
    scEventName,
    enEventName,
    timeZoneId,
    hasPaid,
    paidInfo,
    meetingType,
    meetingWay,
    languageIds,
    interactive,
    conCall,
    hideConCall,
    hasRegistered,
    state,
    timeState,
    offlineAddress,
    onlineAddress,
    onlinePassword,
    regionWithParents,
    playback,
    living,
    registrationInfo,
    live,
    canMakeAppointment,
    event,
    selfEmployed
  ) {
    this.id = id;
    this.free = free;
    this.originalPrice = originalPrice;
    this.currentPrice = currentPrice;
    this.eventId = eventId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.eventName = eventName;
    this.scEventName = scEventName;
    this.enEventName = enEventName;
    this.timeZoneId = timeZoneId;
    this.hasPaid = hasPaid;
    this.paidInfo = paidInfo;
    this.meetingType = meetingType;
    this.meetingWay = meetingWay;
    this.languageIds = languageIds;
    this.interactive = interactive;
    this.conCall = conCall;
    this.hideConCall = hideConCall;
    this.hasRegistered = hasRegistered;
    this.state = state;
    this.timeState = timeState;
    this.offlineAddress = offlineAddress;
    this.onlineAddress = onlineAddress;
    this.onlinePassword = onlinePassword;
    this.regionWithParents = regionWithParents;
    this.playback = playback;
    this.living = living;
    this.registrationInfo = registrationInfo;
    this.live = live;
    this.canMakeAppointment = canMakeAppointment;
    this.event = event;
    this.selfEmployed = selfEmployed;
  }
}

export { LiveInfo, DictChild, Connector, FileInfo, Announcement, Meeting };
