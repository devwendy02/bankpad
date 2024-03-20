import { useMemo, useState } from 'react';
import { putCommas } from 'utils';
import TextInput from 'components/Form/TextInput';
import Header3 from 'components/Typography/Header3';
import P from 'components/Typography/P';
import StyledTextInput2 from 'components/Form/StyledTextInput2';
import Label1 from 'components/Typography/Label1';
import Dvider from 'components/Widgets/Dvider1';
import StepButton from 'components/Butttons/StepButton';
import SetUserButton from 'components/Butttons/SetUserButton';
import { useTokenDraft } from '../../context/TokenContext';
import { useChangePage } from '../../hooks/useChangePage';
import { TokenCreationStep } from '../../types';
import Progress from '../Progress/Progress';

interface Props {
  setIsLoading?: any;
};

export default function Distribution({ setIsLoading }: Props) {
  const teamContact = 'https://t.me/LittleSmile007';
  const { draft, updateDraft } = useTokenDraft()
  const { onChangePage } = useChangePage()

  const teamSupply = useMemo(() => draft
    ? putCommas(draft.total_supply * draft.team_allocation_percent / 100) : 0, [draft])

  return (
    <>
      <Header3 text='Distribution' />
      <div className="max-w-screen-lg lg:pr-36">
        <P text='Setup how your token should be initially distributed.' />
      </div>
      <div className="">
        {/* <Header4 text='Team allocation' /> */}

        <StyledTextInput2
          type="number"
          label='Team supply allocation'
          placeholder={0}
          value={draft?.team_allocation_percent}
          onChange={(evt) => {
            updateDraft({ team_allocation_percent: evt.target.value })
          }}
          min={0}
          max={draft?.max_team_allocation_percent}
          isError1={draft?.team_allocation_percent * 1 > draft?.max_team_allocation_percent * 1}
          errorMessage1={`Value should not be greater than <span>${draft?.max_team_allocation_percent}</span> Should you need to go higher, contact us via <a href=${teamContact} target="_blank">Telegram</a> and we would be happy to help.`}
          start_icon={'%'}
          className="mb-2"
          symbol={draft?.symbol}
          secondValeu={teamSupply}

        />
        <Progress
          percent={draft?.team_allocation_percent}
          startValue={0}
          endValeu={putCommas(draft?.total_supply)}
        />
        <Dvider />

        <div className="mb-6">
          <Label1 text='Team supply address' />
          <TextInput
            inputClassName="pr-18"
            placeholder='Wallet address'
            value={draft?.team_allocation_address}
            onChange={(evt) => { updateDraft({ team_allocation_address: evt.target.value }) }}
            end_Btn={<SetUserButton onClick={() => { updateDraft({ team_allocation_address: draft?.owner_address }) }} />
            }
            className='mb-2'
          />
          <P text='The address to receive the team supply tokens when the token is launched.' small />
        </div>
        {/* <Pannel>
          <div className="flex items-center justify-between mb-6 ">
              <Header4 text='Token Reflections' />
              <SwitchOnOff />
            </div>


            <StyledTextInput2
              value={draft?.reflections_percent}
              onChange={(evt) => { updateDraft('reflections_percent', evt.target.value) }}
              min={0}
              max={serviceLimit?.max_reflections}
              isError1={draft?.reflections_percent > serviceLimit?.max_reflections}
              errorMessage1={`Value should not be greater than ${serviceLimit?.max_reflections}`}
              start_icon={'%'}

              className="mb-5"
              symbol={draft?.symbol}
              secondValeu={teamSupply}

            />
            <P text='The amount of reflections in tokens to be rewarded to holders' small />
        </Pannel> */}

      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mt-9">
        <StepButton
          label='Token Details'
          onClick={() => { onChangePage(TokenCreationStep.DETAILS) }}
          startIcon={<i className="fas fa-arrow-left" />}
        />

        <StepButton
          label='Anti-Bot'
          endIcon={<i className="fas fa-arrow-right" />}
          onClick={() => { onChangePage(TokenCreationStep.ANTIBOT) }}
        />

      </div>
    </>
  )
}
