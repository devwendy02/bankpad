import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { matchPath, useHistory, useLocation } from "react-router-dom";
import Pusher from 'pusher-js';
import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from "config";
import { API_ENDPOINT } from "config/endpoints";
import { TokenProject } from "config/types";
import { useActiveWeb3 } from "hooks/useActiveWeb3";
import { useAuth } from "hooks/useAuth";
import { TokenCreationStep } from "../types";

const StateContext = createContext({
  step: TokenCreationStep.DETAILS,
  uuid: '',
  isLoaded: false,
  eventEmitted: false,
  project: undefined,
  draft: undefined,
  setEventEmitted: (flag) => { },
  updateDraft: (keyValuePair) => { },
  updateProject: (val) => { }
});

export const useCreationStep = () => {
  const { step } = useContext(StateContext)
  return step
}

export const useTokenProject = () => {
  const { isLoaded, project, updateProject } = useContext(StateContext)
  return { isLoaded, project, updateProject }
}

export const useTokenDraft = () => {
  const { draft, updateDraft } = useContext(StateContext)
  return { draft, updateDraft }
}

export const useTokenUUID = () => {
  const { uuid } = useContext(StateContext)
  return uuid
}

export const useEventStatus = () => {
  const { eventEmitted, setEventEmitted } = useContext(StateContext)
  return { eventEmitted, setEventEmitted }
}

export default function StateProvider({ children }: { children: ReactNode; }) {
  const [step, setStep] = useState<TokenCreationStep>(TokenCreationStep.DETAILS);
  const [project, setProject] = useState<TokenProject>()
  const [draft, setDraft] = useState<TokenProject>()
  const [isLoaded, setLoaded] = useState(false)
  const [eventEmitted, setEventEmitted] = useState(false)
  const { authDone, token: jwtToken } = useAuth()

  const { chain } = useActiveWeb3()
  const history = useHistory()
  const location = useLocation();

  const route = matchPath(location.pathname, {
    path: ['/launchpad/:uuid/:step', '/launchpad/:uuid']
  })
  // @ts-ignore
  const { uuid, step: step_ } = route.params

  const pusher = useMemo(() => {
    if (uuid) {
      return new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER
      })
    }
  }, [uuid])
  const channel = useMemo(() => {
    if (pusher && uuid) {
      return pusher.subscribe(`launches-${uuid}`)
    }
  }, [pusher, uuid])

  useEffect(() => {
    if (channel) {
      channel.bind('update', data => {
        //console.log('pusher event data ', data)
        setEventEmitted(true)
        setProject(data)
      })
    }
  }, [channel])

  const _PAGES_ = {
    'token_details': TokenCreationStep.DETAILS,
    'distribution': TokenCreationStep.DISTRIBUTION,
    'antibot': TokenCreationStep.ANTIBOT,
    'taxes': TokenCreationStep.TAX,
    'liquidity': TokenCreationStep.LIQUIDITY,
    'review': TokenCreationStep.REVIEW
  }

  useEffect(() => {
    if (isLoaded) {
      // routing to wrong uuid should be redirected to the /launchpad page
      if (!project) {
        history.replace('/launchpad')
        return;
      }

      const isLaunchedToken = !!project.contract_address

      // token is already launched, can not go to token creation pages
      if (isLaunchedToken && step_ && !eventEmitted) {
        history.replace(`/launchpad/${uuid}`)
      }
      // token is not launched, can not go to token management page
      else if (!isLaunchedToken && !step_) {
        history.replace(`/launchpad/${uuid}/token_details`)
      }
      // token is in creation step
      else if (step_) {
        if (_PAGES_.hasOwnProperty(step_)) setStep(_PAGES_[step_])
        else {
          history.replace(`/launchpad/${uuid}/token_details`)
        }
      }
    }
  }, [step_, project, uuid, isLoaded, chain, eventEmitted]);

  useEffect(() => {
    (async () => {
      if (authDone) {
        try {
          const response = await fetch(
            `${API_ENDPOINT}/launches/${uuid}`, {
            method: 'GET',
            headers: new Headers({
              'Authorization': `Bearer ${jwtToken}`,
            })
          });
          const result = await response.json()
          if (response.status != 200) throw result
          setProject(result)
        } catch (err) {
          console.error(err)
        } finally {
          setLoaded(true)
        }
      }
    })()
  }, [jwtToken, authDone, uuid])

  useEffect(() => {
    setDraft(project)
  }, [project])

  // const updateDraft = (key, value) => {
  //   setDraft({ ...draft, [key]: value })
  // }

  const updateDraft = (keyValuePairs) => {
    setDraft({ ...draft, ...keyValuePairs })
  }

  return (
    <StateContext.Provider value={{
      step, uuid, isLoaded,
      eventEmitted, setEventEmitted,
      project, updateProject: setProject,
      draft, updateDraft
    }}>
      {children}
    </StateContext.Provider>
  );
}
