import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Button from 'components/Butttons/Button';
import Tab from 'components/Widgets/Tab';
import Switch from 'components/Butttons/Switch';
import Header1 from 'components/Typography/Header1';
import { ComingSoonImage, PlusIcon } from 'components/Icons';
import Spinner from 'components/Widgets/Spinner/Spinner';
import { useAuth } from 'hooks/useAuth';
import useNotification from 'hooks/useNotification';
import Card from './components/Card/Card';
import Filter from './components/Filter';
import { useLaunchpadFilter, useProjects } from './context/LaunchPadContext';
import { useCreate } from './hooks/useCreate';

export default function LaunchPad() {
  const [tabId, setTabId] = useState(0)
  const [isAdvanced, setIsAdvanced] = useState(false)

  const {
    filter, updateFilter, resetFilter,
  } = useLaunchpadFilter()
  const { projects, loading } = useProjects()

  const history = useHistory()
  const { failed } = useNotification()
  const { token: jwtToken } = useAuth()
  const { onCreate } = useCreate()

  const projectsToDisplay = useMemo(() => {
    const filtered = filter.isMineOnly ? projects.mine : projects.all

    return filtered.sort((a, b) => {
      if (!a.contract_address && b.contract_address) return -1
      if (a.contract_address && !b.contract_address) return 1
    })
  }, [projects, filter, tabId])

  const onChangeTab = (newTab) => {
    setTabId(newTab)
    updateFilter('isMineOnly', newTab != 0)
  }

  const handleCreate = async () => {
    try {
      const result = await onCreate()
      if (result.uuid) {
        history.push(`/launchpad/${result.uuid}/token_details`)
      } else {
        failed(result.message || "Something went wrong")
      }
    } catch (err) {
      failed(err?.toString())
    }
  }

  const headerContainerClass = "px-3 border border-gray-200 rounded-md bg-gray-19 dark:bg-dark-3 dark:border-dark-1 md:pl-4 md:pr-5"
  const headerWrapClass = "flex items-start lg:items-center justify-between pt-1.5  relative mb-2.5"
  const titleDivClass = "flex flex-col gap-3 sm:items-center sm:flex-row lg:gap-7"
  const filterBtnClass = "flex items-center"
  const tabDivClass = "flex items-start justify-between gap-3 pt-5 sm:items-center"
  const itemsWrapCalss = "space-y-3.5"

  return (
    <>
      <div className={headerContainerClass}>
        <div className={headerWrapClass}>
          <div className={titleDivClass}>
            <Header1 text='Launchpad' />
            <div className={filterBtnClass}>
              <Button
                label={`All (${projects.all.length})`}
                focusedBtn
                isFocused={!filter.isMineOnly}
              />
              <Button
                label={` MY (${projects.mine.length})`}
                focusedBtn
                isFocused={filter.isMineOnly}
              />
            </div>
          </div>
          <Button
            disabled={!jwtToken}
            startIcon={<PlusIcon className="w-5 md:w-6" />}
            label='Create'
            onClick={handleCreate}
            outline
          />
        </div>
        <div className={tabDivClass}>
          <Tab
            tabList={['LAUNCHED TOKENS', 'MY TOKENS']}
            tabId={tabId}
            onChangeTab={onChangeTab}
          />
          <Switch
            label='Advanced mode'
            switched={isAdvanced}
            onChange={(val) => {
              setIsAdvanced(val)
              resetFilter()
            }}
          />
        </div>
      </div>
      {isAdvanced && <Filter />}

      {projectsToDisplay.length > 0 ?
        <div className="py-10">
          <div className={itemsWrapCalss}>
            {projectsToDisplay.map((pj, k) => (
              <Card project={pj} index={k} key={k} isDraft={!pj.contract_address} />
            ))}
          </div>
        </div>
        : loading
          ? <Spinner size={96} />
          : <div className="">
            <div className="mx-auto my-36 sm:max-w-sm">
              <ComingSoonImage />
              <p className="text-base text-center dark:text-gray-4 mt-6">There are no tokens to display</p>
            </div>
          </div>
      }
    </>
  )
}
