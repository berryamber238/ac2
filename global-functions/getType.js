import * as gf from '../custom-files/gf';

const getType = (Variables, a) => {
  switch (a) {
    case 'Minute':
      //纪要
      return gf.t(Variables, 'mine_note_collection');

      break;
    case 'Article':
      //观点
      return gf.t(Variables, 'tab_vote_point');
      break;
    case 'Event':
      return gf.t(Variables, 'tab_events');
      //活动
      break;
  }
  return a;
};

export default getType;
