export const classHelper = (initialClass, otherClasses) => {
  let classArray = [initialClass];

  otherClasses.map((option) => {
    if (option[1]) {
      classArray.push(option[0])
    }
  });

  return classArray.join(' ');
};
