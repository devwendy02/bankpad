import { useMemo } from 'react';
import CustomDropdown from 'components/dropdown/CustomDropdown';
import { CHAINS, DEFAULT_CHAIN } from 'config/chains';
import { SORT_BY, useLaunchpadFilter } from '../../context/LaunchPadContext';
import Switch from 'components/Butttons/Switch';
import Search from 'components/Form/Search';

const Filter = () => {
  const {
    filter, updateFilter,
    searchStringInTyping, setSearchStringInTyping,
  } = useLaunchpadFilter()

  const chainList = CHAINS.map((chain) => (
    { label: chain.name, value: chain.id }
  ))

  const sortList = [
    { label: 'Newest on top', value: 'Newest on top' },
    { label: 'Oldest on top', value: 'Oldest on top' },
  ]

  const onChangeSort = (value) => {
    updateFilter('sortBy', value)
  }

  const onChangeChain = (value) => {
    updateFilter('chain_id', value)
  }

  const onChangeSearchInput = (evt) => {
    setSearchStringInTyping(evt.target.value)
  }

  const onKeyUpSearchInput = (evt) => {
    // if (evt.keyCode == 13)
    // updateFilter('searchString', searchStringInTyping)
    updateFilter('searchString', evt.target.value)
  }
  const containerClass = "flex flex-col justify-between gap-3 mt-10 lg:flex-row";
  const switchWrappClass = "flex items-end py-4"
  const dropLabelClass = "block mb-2 text-base font-medium md:text-lg dark:text-gray-4"
  const dropWrappClass = "w-1/2 sm:w-60 lg:w-48 xl:w-60"
  const dropConetentClass = "react-dropdown-wrapper ts-wrapper dark:!bg-dark-3 !bg-gray-19 rounded-md dark:text-white single full"
  return (
    <>
      <div className={containerClass}>
        <Search
          value={searchStringInTyping}
          onChange={onChangeSearchInput}
          onKeyUp={onKeyUpSearchInput}
        />

        {/* <div className={switchWrappClass}>
          <Switch
            label='Launch Delay'
            switched={filter.isTradingDelayOnly}
            onChange={(val) => updateFilter('isTradingDelayOnly', val)}
          />
        </div> */}

        {/* Filter */}
        <div className="flex gap-6">
          {/* Sort by */}
          <div className={dropWrappClass}>
            <label htmlFor="Sortby" className={dropLabelClass}>Sort by</label>
            <div className={dropConetentClass} >
              <CustomDropdown
                value={sortList[0]}
                // buttonText={sortLabel[filter.sortBy]}
                options={sortList}
                onChange={onChangeSort} />
            </div>

          </div>

          {/* Chain */}
          <div className={dropWrappClass}>
            <label htmlFor="Chain" className={dropLabelClass}>Chain</label>
            <div className={dropConetentClass} >
              <CustomDropdown
                value={chainList[0]}
                // buttonText={filteredChain_.name}
                options={chainList}
                onChange={onChangeChain} />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Filter
