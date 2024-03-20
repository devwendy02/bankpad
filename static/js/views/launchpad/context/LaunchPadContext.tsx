import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import { API_ENDPOINT } from "config/endpoints";
import { TokenProject } from "config/types";
import { DEFAULT_CHAIN } from "config/chains";
import { useAuth } from "hooks/useAuth";
import { useActiveWeb3 } from "hooks/useActiveWeb3";

export enum SORT_BY {
  NEWEST = 'desc',
  OLDEST = 'asc'
}

interface ProjectFilter {
  searchString: string
  sortBy: SORT_BY
  chain_id: number
  isTradingDelayOnly: boolean
  isMineOnly: boolean
}

const initialFilter = {
  searchString: '',
  sortBy: SORT_BY.NEWEST,
  chain_id: DEFAULT_CHAIN.id,
  isTradingDelayOnly: false,
  isMineOnly: false
}

const initialProjects = {
  all: [],
  mine: []
}

const StateContext = createContext<{
  projects: {
    all: TokenProject[],
    mine: TokenProject[]
  },
  projectCount: {
    all: number,
    mine: number
  },
  filter: ProjectFilter,
  searchStringInTyping: string,
  loading: boolean,
  updateFilter?: (key, val) => void,
  resetFilter?: () => void,
  setSearchStringInTyping?: (val) => void,
}>({
  projects: initialProjects,
  projectCount: {
    all: 0,
    mine: 0
  },
  loading: false,
  filter: initialFilter,
  searchStringInTyping: ''
});

export const useProjects = () => {
  const { projects, loading } = useContext(StateContext)
  return { projects, loading }
}

export const useLaunchpadFilter = () => {
  const { projects, ...rest } = useContext(StateContext)
  return { ...rest }
}

export default function StateProvider({ children }: { children: ReactNode; }) {
  const { authDone, token: jwtToken } = useAuth()

  const [projects, setProjects] = useState(initialProjects)
  const [projectCount, setProjectCount] = useState({ all: 0, mine: 0 })
  const [loading, setLoading] = useState(false)

  const [searchStringInTyping, setSearchStringInTyping] = useState('')
  const [filter, setFilter] = useState<ProjectFilter>(initialFilter)
  const [page, setPage] = useState(1)

  const prevFilterRef = useRef<ProjectFilter>(initialFilter)
  const prevPageRef = useRef<number>(1)
  const prevJwtTokenRef = useRef<string>()

  const { chainId } = useActiveWeb3()

  const updateFilter = (key, value) => setFilter({ ...filter, [key]: value })
  const resetFilter = useCallback(() => {
    setFilter({ ...initialFilter, isMineOnly: filter.isMineOnly })
  }, [filter])

  useEffect(() => {
    (async () => {
      try {
        const filterChanged = !_.isEqual(prevFilterRef.current, filter)
        // stop api call when there are not any status updates
        if (prevPageRef.current == page
          && !filterChanged
          && prevJwtTokenRef.current == jwtToken) return

        setLoading(true)
        // when filter changes, page is reset to 1
        const page_ = filterChanged ? 1 : page

        let query = `?sort_by=${filter.sortBy}`
        if (filter.searchString.trim())
          query = `${query}&term=${filter.searchString.trim()}`
        if (filter.isTradingDelayOnly)
          query = `${query}&trading_delay=${filter.isTradingDelayOnly}`

        /**** fetch user-specific projects ****/
        // @dev we do not add pagination when fetching user specific projects and drafts
        // a user can not create more than 12 projects
        let response, myProjects = []
        if (jwtToken) {
          response = await fetch(
            `${API_ENDPOINT}/launches${query}&chain_id=${chainId}`, {
            method: 'GET',
            headers: new Headers({
              'Authorization': `Bearer ${jwtToken}`,
            })
          });
          myProjects = await response.json()
        }

        /**** fetch all launched projects ****/
        // @dev add pagination param to the query when fetching whole projects
        // pagination param &page=2&per_page=30
        query = `${query}&chain_id=${filter.chain_id}`
        query = `${query}&page=${prevPageRef.current}`
        response = await fetch(
          `${API_ENDPOINT}/launches/search${query}`, { method: 'GET' });

        // total count is contained in the response header
        const totalProjectCount = response.headers.get('pagination-count')
        const totalProjects = await response.json()

        setProjectCount({ all: Number(totalProjectCount), mine: myProjects.length })
        setProjects({
          all: totalProjects,
          mine: myProjects,
        })

        prevFilterRef.current = filter
        prevPageRef.current = page_
        prevJwtTokenRef.current = jwtToken
        if (filterChanged) setPage(page_)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [filter, page, jwtToken, chainId])

  return (
    <StateContext.Provider value={{
      projects, projectCount, loading,
      filter, updateFilter, resetFilter,
      searchStringInTyping, setSearchStringInTyping
    }}>
      {children}
    </StateContext.Provider>
  );
}
