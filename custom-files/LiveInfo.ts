export interface LiveInfo {
  id?: string | null;
  state?: string | null;
  user_id?: number | null;
  vendor?: string | null;
  meeting?: Meeting | null;
  user_type?: string | null;
  demo?: boolean | null;
  super_moderator?: boolean | null;
  can_upload_background?: boolean | null;
  background?: string | null;
  help?: string | null;
  description?: string | null;
  en_description?: string | null;
  sc_description?: string | null;
  screen_share_user_id?: string | null;
  app_id?: string | null;
  privilege_expired_ts?: string | null;
  role?: string | null;
  rtc?: LiveRT | null;
  rtm?: LiveRT | null;
  live_state?: string | null;
  live_type?: string | null;
  live_experts?: DictChild[] | null;
  cover?: string | null;
  pause_cover?: string | null;
  live_state_events?: string[] | null;
  logo?: string | null;
  name?: string | null;
  user_score?: string | null;
  user_full_name?: string | null;
  user_nickname?: string | null;
  sc_organization_name?: string | null;
  en_organization_name?: string | null;
  organization_score?: string | null;
  organization_type_id?: string | null;
  position_name?: string | null;
  primary_users?: PrimaryUser | null;
  settings?: LiveSettings | null;
  rtmp_play_urls?: RtmpPlay | null;
  remindered_at?: string | null;
  connector?: Connector | null;
  live_preview_files?: FileInfo[] | null;
  announcement?: Announcement | null;
  allow_public_channel?: boolean | null;
  monitor?: string | null;
}

export interface LiveRT {
  channel?: string | null;
  token?: string | null;
}

export interface Meeting {
  id?: string | null;
  free?: boolean | null;
  original_price?: string | null;
  current_price?: string | null;
  event_id?: string | null;
  start_time?: number | null;
  end_time?: number | null;
  event_name?: string | null;
  sc_event_name?: string | null;
  en_event_name?: string | null;
  time_zone_id?: string | null;
  has_paid?: boolean | null;
  paid_info?: PaidInfo | null;
  meeting_type?: string | null;
  meeting_way?: string | null;
  language_ids?: string[] | null;
  interactive?: boolean | null;
  con_call?: string | null;
  hide_con_call?: boolean | null;
  has_registered?: boolean | null;
  state?: string | null;
  time_state?: string | null;
  offline_address?: string | null;
  online_address?: string | null;
  online_password?: string | null;
  region_with_parents?: Region | null;
  playback?: boolean | null;
  living?: boolean | null;
  registration_info?: RegistrationInfo | null;
  live?: LiveInfo | null;
  can_make_appointment?: boolean | null;
  event?: Event | null;
  self_employed?: boolean | null;
}

export interface PaidInfo {
  state?: string | null;
  sncode?: string | null;
  paid_at?: number | null;
  created_at?: number | null;
  type?: string | null;
  price?: number | null;
  actual_paid?: number | null;
  payment_type?: string | null;
  card_type?: string | null;
}

export interface Region {
  id?: string | null;
  sc_name?: string | null;
  en_name?: string | null;
  name?: string | null;
  country_code?: string | null;
  emoji_flag?: string | null;
  child?: Region | null | null;
}

export interface RegistrationInfo {
  registration_name?: string | null;
  email?: string | null;
  cal_uid?: string | null;
  cal_organizer?: string | null;
  cal_sequence?: number | null;
}

export interface Event {
  id?: string | null;
  type?: string | null;
  event_type_id?: string | null;
  state?: string | null;
  contacts?: DictChild[] | null;
  can_registration_online?: boolean | null;
  is_anonymous?: boolean | null;
  name?: string | null;
  sc_name?: string | null;
  sc_description?: string | null;
  en_description?: string | null;
  corporation_ids?: string[] | null;
  industry_ids?: string[] | null;
  organization?: Organization | null;
  co_host_organizations?: Organization[] | null;
  registration_meeting_limit?: boolean | null;
  release_time?: number | null;
  start_time?: number | null;
  audit_time?: number | null;
  end_time?: number | null;
  shown_time?: number | null;
  addresses?: string[] | null;
  playback?: boolean | null;
  living?: boolean | null;
  can_register?: boolean | null;
  language_ids?: string[] | null;
  has_registered?: boolean | null;
  exists_need_pay_meeting?: boolean | null;
  links?: DictChild[] | null;
  attachments?: DictChild[] | null;
}

export interface DictChild {
  id?: string | null;
  name?: string | null;
  value?: string | null;
  phone?: string | null;
  code?: string | null;
  lower?: string | null;
  upper?: string | null;
  unit?: string | null;
  currency?: string | null;
  description?: string | null;
  type?: string | null;
  priority?: number | null;
  en_type_name?: string | null;
  sc_type_name?: string | null;
  tc_type_name?: string | null;
  en_description?: string | null;
  sc_description?: string | null;
  tc_description?: string | null;
  event_type_group?: DictChild | null;
}

export interface Organization {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  deleted_at?: string | null;
  state?: string | null;
  score?: number | null;
  organization_type_id?: string | null;
  sator_organization_id?: number | null;
  is_producer?: boolean | null;
  management_scale_id?: string | null;
  fund_type_ids?: string[] | null;
  ticker?: string | null;
  tel?: string | null;
  website?: string | null;
  logo?: string | null;
  industry_id?: string | null;
  industry_ids?: string[] | null;
  sns_action_flag?: PointSnsActionFlag | null;
  stats?: MineCountStats | null;
  followed?: boolean | null;
  belongs_organization_id?: string | null;
  belongs_organization_name?: string | null;
  belongs_organization_contact?: string | null;
  self_employed?: boolean | null;
}

export interface PrimaryUser {
  broadcasters?: string[] | null;
  experts?: string[] | null;
  unmute_audiences?: string[] | null;
  hands_up_audiences?: string[] | null;
  staff?: string[] | null;
}

export interface LiveSettings {
  mute?: boolean | null;
  view_attendee?: boolean | null;
  view_message?: boolean | null;
  view_member_count?: boolean | null;
  manage_mute?: boolean | null;
  hands_up?: string | null;
}

export interface RtmpPlay {
  origin?: string | null;
  sd?: string | null;
}

export interface Connector {
  title?: string | null;
  online_state?: string | null;
}

export interface FileInfo {
  id?: string | null;
  live_id?: string | null;
  transfer_status?: string | null;
  file_name?: string | null;
  preview_info?: PreviewFile | null;
}

export interface PreviewFile {
  url?: string | null;
  region?: string | null;
  bucket?: string | null;
  access_key_id?: string | null;
  access_key_secret?: string | null;
  sts_token?: string | null;
  expiration?: string | null;
  preview_url?: string | null;
}

export interface Announcement {
  key?: string | null;
  content?: string | null;
}

export interface PointSnsActionFlag {
  liked?: boolean | null;
  disliked?: boolean | null;
  favorited?: boolean | null;
  following?: boolean | null;
  followed?: boolean | null;
}

export interface MineCountStats {
  opinion_count?: string | null;
  topic_count?: string | null;
  following_count?: string | null;
  follower_count?: string | null;
  favorite_count?: string | null;
  view_count?: string | null;
  like_count?: string | null;
  dislike_count?: string | null;
  comment_count?: string | null;
  share_count?: string | null;
  gift?: string | null;
  event_count?: string | null;
  post_count?: string | null;
  topic_comment_count?: string | null;
}

export interface LiveAttribute {
  user_id?: string | null;
  name?: string | null;
  full_name?: string | null;
  nick_name?: string | null;
  user_nickname?: string | null;
  position_name?: string | null;
  logo?: string | null;
  en_organization_name?: string | null;
  sc_organization_name?: string | null;
  role?: string | null;
  organization_type_id?: string | null;
  organization_score?: string | null;
  user_score?: string | null;
  online_state?: string | null;
  share_screen_id?: string | null;
  mute?: boolean | null;
  view_attendee?: boolean | null;
  view_message?: boolean | null;
  view_member_count?: boolean | null;
  manage_mute?: boolean | null;
  super_moderator?: boolean | null;
  has_paid?: boolean | null;
  card_type?: string | null;
  phone_number?: string | null;
  hands_up?: string | null;
}

export interface ChatMessageBean {
  groupId?: string | null;
  groupName?: string | null;
  logo?: string | null;
  lastMsg?: string | null;
  user_score?: string | null;
  readNum?: number | null;
  chatMessages?: ChatMessage[] | null;
}

export interface ChatMessage {
  groupId?: string | null;
  sendUid?: string | null;
  msg?: string | null;
  time?: number | null;
}
export interface CallOut {
  live_id?: string | null;
  user_id?: string | null;
  agora_user_id?: string | null;
  phone_number?: string | null;
  online_state?: string | null;
  hang_up_reason?: string | null;
  title?: string | null;
  quanshi_user_id?: string | null;
  code?: string | null;
}
