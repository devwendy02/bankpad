import { putCommas } from 'utils';
import { useServiceLimit } from 'contexts/BankServiceContext';
import { useTokenDraft } from '../../context/TokenContext';
import { useChangePage } from '../../hooks/useChangePage';
import { TokenCreationStep } from '../../types';
import Header3 from 'components/Typography/Header3';
import P from 'components/Typography/P';
import Note from 'components/Widgets/Note';
import Header4 from 'components/Typography/Header4';
import StyledTextInput2 from 'components/Form/StyledTextInput2';
import Pannel from 'components/Widgets/Pannel';
import SwitchOnOff from 'components/Butttons/SwitchOnOff';
import Tiny from 'components/Typography/Tiny';
import StepButton from 'components/Butttons/StepButton';

interface Props {
  setIsLoading?: any;
}

export default function AntiBot({ setIsLoading }: Props) {
  const { onChangePage } = useChangePage()
  const serviceLimit = useServiceLimit()
  const { draft, updateDraft } = useTokenDraft()

  return (
    <>
      <Header3 text='Anti-Bot protection' />
      <div className="max-w-screen-lg lg:pr-36">
        <P text='Optionally enable these features to protect your token launch from bots and snipers. You can change these setting until you renounce your contract.' />
      </div>
      <Note note='Note: Once you launch your token, you can only increase your anti-bot limits' />
      <div className="">
        <div className='mb-8'>
          <StyledTextInput2
            type="number"
            label={'Max tokens per trade'}
            placeholder={0}
            min={serviceLimit?.min_tokens_per_transaction}
            max={serviceLimit?.max_tokens_per_transaction}
            value={draft?.max_tokens_per_transaction_percent}
            onChange={(evt) => { updateDraft({ max_tokens_per_transaction_percent: evt.target.value }) }}
            isError1={draft?.max_tokens_per_transaction_percent > serviceLimit?.max_tokens_per_transaction}
            errorMessage1={`Value should not be greater than <span>${serviceLimit?.max_tokens_per_transaction}</span>`}
            isError2={draft?.max_tokens_per_transaction_percent < serviceLimit?.min_tokens_per_transaction}
            errorMessage2={`Value should not be less than <span>${serviceLimit?.min_tokens_per_transaction}</span>`}
            start_icon={'%'}
            className="mb-2"
            symbol={draft?.symbol || 'Frist'}
            secondValeu={putCommas(draft?.total_supply * draft?.max_tokens_per_transaction_percent / 100)}
          />
          <P text='The maximum number of tokens that can be traded in a single transaction' small />
        </div>

        <div className="mb-8">
          <StyledTextInput2
            type="number"
            label={'Max tokens per wallet'}
            placeholder={0}
            min={serviceLimit?.min_tokens_per_wallet}
            max={serviceLimit?.max_tokens_per_wallet}
            value={draft?.max_tokens_per_wallet_percent}
            onChange={(evt) => { updateDraft({ max_tokens_per_wallet_percent: evt.target.value }) }}
            isError1={draft?.max_tokens_per_wallet_percent > serviceLimit?.max_tokens_per_wallet}
            errorMessage1={`Value should not be greater than <span>${serviceLimit?.max_tokens_per_wallet}</span>`}
            isError2={draft?.max_tokens_per_wallet_percent < serviceLimit?.min_tokens_per_wallet}
            errorMessage2={`Value should not be less than <span>${serviceLimit?.min_tokens_per_wallet}</span>`}
            start_icon={'%'}


            className="mb-2"
            symbol={draft?.symbol || 'Frist'}
            secondValeu={putCommas(draft?.total_supply * draft?.max_tokens_per_wallet_percent / 100)}

          />
          <P text='The maximum number of tokens a single wallet can hold' small />
        </div>

        <Pannel>
          <div className="flex items-center justify-between">
            <Header4 text='Sniper auto-burn' />
            <SwitchOnOff
              switched={draft?.snipe_auto_burn}
              onChange={(val) => { updateDraft({ snipe_auto_burn: val }) }}
            />
          </div>
          {
            draft?.snipe_auto_burn && (
              <>
                  <div className="flex flex-col flex gap-1 mt-4">
                      <P medium text='Sniper auto-burn is enabled and will add an additional:' />
                      <P medium text='1. 20% tax on buys in the first block' />
                      <P medium text='2. Reducing to 13.33% in the second block' />
                      <P medium text='3. Reducing to 6.66% in the third' />
                      <P medium text='4. Finally 0% from the fourth block on' />
                      <P medium text='The proceeds from the anti-snipe tax are immediately burned, reducing your total supply.' />
                      <P medium text='You will not generate additional revenue from this tax and should only use this feature to deter sniping.' />
                  </div>
              </>
            )
          }
        </Pannel>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mt-9">

        <StepButton
          label='Distribution'
          onClick={() => { onChangePage(TokenCreationStep.DISTRIBUTION) }}
          startIcon={<i className="fas fa-arrow-left" />}
        />

        <StepButton
          label='Taxes'
          endIcon={<i className="fas fa-arrow-right" />}
          onClick={() => { onChangePage(TokenCreationStep.TAX) }}
        />
      </div>
    </>
  )
}
