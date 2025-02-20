const getNameById = (Variables, type, id) => {
  const data = Variables['ace_dic'].data;
  let dictChildList;

  switch (type) {
    case 1: // DICT_TIME_ZONES
      dictChildList = data.timezones;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.code;
        }
      }
      break;
    case 3: // DICT_MANAGEMENT_SCALES
      dictChildList = data.management_scales;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.description;
        }
      }
      break;
    case 5: // DICT_EVENT_TYPES
      dictChildList = data.event_types;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.event_type_group.name;
        }
      }
      break;
    case 2: // DICT_LANGUAGES
      dictChildList = data.languages;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
      break;
    case 4: // DICT_INDUSTRIES
      dictChildList = data.industries;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
      break;
    case 6: // DICT_EVENT_TYPE_GROUPS
      dictChildList = data.event_type_groups;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
      break;
    case 7: // DICT_CAPITAL_POSITIONS
      dictChildList = data.capital_positions;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
      break;
    case 8: // DICT_CORPORATION_POSITIONS
      dictChildList = data.corporation_positions;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
      break;
    case 9: // DICT_ORGANIZATION_TYPES
      dictChildList = data.organization_types;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
      break;
    case 10: // DICT_TICKER_REGIONS
      dictChildList = data.ticker_regions;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
      break;
    case 11: // DICT_FUND_TYPES
      dictChildList = data.fund_types;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
      break;
    case 12: // DICT_GUEST_POSITIONS
      dictChildList = data.guest_positions;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
      break;
    case 13: //custom_sectors
      dictChildList = data.custom_sectors;
      for (let dictChild of dictChildList) {
        if (dictChild.id === id) {
          return dictChild.name;
        }
      }
    default:
      dictChildList = [];
      break;
  }
  return '';
};

export default getNameById;
