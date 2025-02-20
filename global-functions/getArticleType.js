import * as gf from '../custom-files/gf';

const getArticleType = (Variables, type) => {
  switch (type) {
    case 'Minute':
      return gf.t(Variables, 'mine_note_collection');
      break;
    case 'Article':
      return gf.t(Variables, 'tab_vote_point');
      break;
    case 'Event':
      return gf.t(Variables, 'tab_events');
      break;
  }
  return type;
};

export default getArticleType;
