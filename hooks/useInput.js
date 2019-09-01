import { useState } from 'react';

const useInput = (init = '') => {
  const [value, setValue] = useState(init);
  const handleChange = (e) => { setValue(e.target.value); };
  return [value, handleChange];
};

export default useInput;
