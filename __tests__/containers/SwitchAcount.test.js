import React from 'react'
import SwitchAccount from '../../src/app/containers/SwitchAccount/SwitchAccount'
import SwitchAccountCard from '../../src/app/components/SwitchAccountCard'
import SwitchAccountConfirm from '../../src/app/components/SwitchAccountConfirm'

import testKeys from '../testKeys.json'
import { mount } from 'enzyme'

describe('Switch Account', () => {
  const props = {
    selectedNetworkId: 'TestNet',
    networks: {
      TestNet: { name: 'TestNet', url: 'https://neoscan-testnet.io', canDelete: false, apiType: 'neoscan' },
    },
    account: {
      wif: testKeys.t1.wif,
      address: testKeys.t1.address,
    },
    accounts: {
      [testKeys['t1']['address']]: {
        address: testKeys.t1.address,
        label: 'My account',
        encryptedKey: '',
        neo: 0,
        gas: 0,
      },
      ARjkxk6VcKPFKqRHhuLNog9TbdYxhKu9be: {
        address: 'ARjkxk6VcKPFKqRHhuLNog9TbdYxhKu9be',
        label: 'TestKonto',
        encryptedKey: '',
        neo: 0,
        gas: 0,
      },
    },
    setAccount: jest.fn(),
  }

  test('It renders the correct number of accounts', () => {
    const wrapper = mount(<SwitchAccount { ...props } />)

    console.log(props.accounts)

    wrapper.setState({
      accounts: [props.accounts[testKeys['t1']['address']], props.accounts.ARjkxk6VcKPFKqRHhuLNog9TbdYxhKu9be],
    })

    const cards = wrapper.find(SwitchAccountCard)
    expect(cards.length).toBe(2)
    expect(wrapper.instance().state.accounts.length).toBe(2)
  })

  test('It correctly shows password form when switch account is clicked', () => {
    const wrapper = mount(<SwitchAccount { ...props } />)

    wrapper.setState({
      accounts: [props.accounts[testKeys['t1']['address']], props.accounts.ARjkxk6VcKPFKqRHhuLNog9TbdYxhKu9be],
    })

    wrapper.find('.switchAccountButton').simulate('click')

    expect(wrapper.find(SwitchAccountConfirm).length).toBe(1)
  })
})
