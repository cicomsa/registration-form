import { useContext, createContext } from 'react';

export const useContentData = () => useContext(ContentData);

const defaultValues = {};
const ContentData = createContext(defaultValues);

export default ContentData;
