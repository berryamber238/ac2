const getScalesById = (Variables, id) => {
  const dicObj = Variables.ace_dic.data.management_scales.find(
    obj => obj.id === id
  );

  return dicObj?.currency + dicObj?.description;
};

export default getScalesById;
