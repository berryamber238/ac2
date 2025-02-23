const JumpToPageByType = (navigation, type, id, base_url) => {
  switch (type) {
    case 'Event':
      navigation.push('EventDetailScreen', {
        event_id: id,
      });
      break;
    case 'Opinion':
      navigation.push('OpinionInfoScreen', {
        id: id,
      });
      break;
    case 'Topic':
      navigation.push('WebViewScreen', {
        url: base_url + ('/topic/detail/' + id),
      });
      break;
    default:
      navigation.push('ArticleDetailScreen', {
        article_info_id: id,
      });
  }
};

export default JumpToPageByType;
