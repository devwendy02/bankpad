import { HashLink } from 'react-router-hash-link'
import TextInput from 'components/Form/TextInput';
import Header3 from 'components/Typography/Header3';
import P from 'components/Typography/P';
import Label1 from 'components/Typography/Label1';
import SocialInput from 'components/Form/SocialInput';
import StepButton from 'components/Butttons/StepButton';
import EditableSelect from 'components/Form/EditableSelect/EditableSelect';
import { useTokenDraft } from '../../context/TokenContext';
import { useChangePage } from '../../hooks/useChangePage';
import { TokenCreationStep } from '../../types';
import {
  formatTelegramToInput,
  formatTwitterToInput,
  formatWebsiteToInput
} from '../../util';

interface Props {
  setIsLoading?: any;
};

export default function TokenDetails({ setIsLoading }: Props) {
  const totalSuplyList = [10000, 1000000, 10000000, 69420000, 100000000,
    1000000000, 10000000000, 100000000000];
  const { draft, updateDraft } = useTokenDraft()
  const { onChangePage } = useChangePage()

  return (
    <>
      <Header3 text='Let’s get you started' />
      <div className="max-w-screen-lg lg:pr-36">
        <P text='Set up the on-chain properties of your token contract and how it will appear on DEX’s, wallets and apps.' />
      </div>
      <div className='mb-6'>
        <Label1 text='Token Name' size='sm' />
        <TextInput
          placeholder='The name of the token'
          value={draft?.name}
          onChange={(evt) => { updateDraft({ name: evt.target.value }) }}
          className='mb-2'
          size='sm'
        />
        <P text='The full display name of the token. Example: First Crypto Bank' small />
      </div>

      <div className="mb-11">
        <div className="grid gap-6 md:grid-cols-12 mb-2">
          <div className="md:col-span-5 lg:col-span-4 xl:col-span-3">
            <Label1 text='Ticker Symbol' size='sm' />
            <TextInput
              label={'Ticker Symbol'}
              placeholder='Token symbol'
              value={draft?.symbol}
              onChange={(evt) => { updateDraft({ symbol: evt.target.value?.toUpperCase() }) }}
              size='sm'
              isError1={draft?.symbol?.length > 32}
              errorMessage1='Max 32 characters can be set for the symbol'
            />
          </div>

          <div className="md:col-span-7 lg:col-span-7 xl:col-span-6">
            <Label1 text='Total Supply' size='sm' />
            <EditableSelect
              value={draft?.total_supply}
              setValue={(val) => { updateDraft({ total_supply: val }) }}
              options={totalSuplyList} />
          </div>
        </div>
        <P text='Ticker symbol of the token. Example: FIRST' small />
      </div>

      <div className="">
        <div className="flex items-center gap-8 mb-6">
          <Header3 text='Social links' />
          <div className="grow h-0.5 dark:bg-dark-3"></div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <SocialInput
            label='Telegram'
            socialName='t.me/'
            placeholder="linkName"
            value={formatTelegramToInput(draft?.telegram_url)}
            onChange={(evt) => { updateDraft({ telegram_url: evt.target.value }) }}
          />
          <SocialInput
            label='Twitter (Optional)'
            socialName='twitter.com/'
            placeholder="linkName"
            value={formatTwitterToInput(draft?.twitter_url)}
            onChange={(evt) => { updateDraft({ twitter_url: evt.target.value }) }}
          />

          <SocialInput
            label='Website (Optional)'
            socialName='https://'
            placeholder="example.com"
            value={formatWebsiteToInput(draft?.website_url)}
            onChange={(evt) => { updateDraft({ website_url: evt.target.value }) }}
          />

        </div>

      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mt-9">

        <StepButton
          label='Launchpad'
          link={`/launchpad/`}
          startIcon={<i className="fas fa-arrow-left" />}
        />

        <StepButton
          label='Distribution'
          endIcon={<i className="fas fa-arrow-right" />}
          onClick={() => { onChangePage(TokenCreationStep.DISTRIBUTION) }}
        />

      </div>
    </>
  )
}
