import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';
import { setConstantValue } from 'typescript';

type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialDate: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialDate);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.target.value as unknown) as T);
  },[]);
  return [value, handler, setValue];
}

export default useInput;