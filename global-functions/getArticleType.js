import * as gf from '../custom-files/gf';

const getArticleType = (Variables, type) => {
  switch (type) {
    case 'Minute':
      return gf.t(Variables, 'mine_note_collection');
      break;
    case 'Article':
      return gf.t(Variables, 'tab_articles');
      break;
    case 'Event':
      return gf.t(Variables, 'tab_events');
      break;
    case 'Opinion':
      return gf.t(Variables, 'tab_vote_point');
    case 'Topic':
      return gf.t(Variables, 'tab_vote_short');
  }
  return type;
};

export default getArticleType;
