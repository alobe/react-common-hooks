import { useRef, useState, useCallback } from 'react'
import { useHistory } from 'react-router'
import qs from 'qs'

export const deepObjDeps = <T extends {}>(obj: Readonly<T>) => JSON.stringify(obj)

export const useRouterQuery = (byReplace = false) => {
  const { replace, push, location: { search, pathname } } = useHistory();
  const state = useRef(qs.parse(search) || {})
  return {
    query: state.current,
    setQuery: (handler: (query: any) => any, render = true) => {
      state.current = handler(state.current)
      render && (byReplace ? replace : push)({pathname, search: qs.stringify(state.current)})
    }
  }
}

export const useOState = <T extends {[key: string]: any}>(init: T | (() => T)): [T, (s: Partial<T>) => void] => {
  const [state, set] = useState<T>(init);
  return [state, useCallback((s: Partial<T>) => set((S: T) => ({ ...S, ...s })), [set])];
}

