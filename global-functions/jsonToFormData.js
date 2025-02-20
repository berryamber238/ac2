const jsonToFormData = data => {
  const formData = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

  return formData;
};

export default jsonToFormData;
