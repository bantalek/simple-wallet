import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Header, Text, Input, Table } from '@bpanel/bpanel-ui';

import { safeEval, preventDefault, buildSingleRowTable } from '../utilities';
import { PLUGIN_NAMESPACE } from '../constants';

import ProposalInfo from './ProposalInfo';
import CreateProposal from './CreateProposal';
import JoinWallet from './JoinWallet';
import ProposalUX from './ProposalUX';
import ProposalList from './ProposalList';

import styles from '../styles';

class MultisigUX extends Component {
  constructor() {
    super();
  }

  static get propTypes() {
    return {
      proposalInfo: PropTypes.object
    }
  }

  render() {
    const {
      handleCreate,
      handleUpdate,
      handleSelect,
      createWalletPassphraseInput,
      createWalletNInput,
      createWalletMInput,
      hardwareAccountInput,
      multisigWalletNameInput,
      createCosignerNameInput,
      joinCosignerNameInput,
      proposalNameInput,
      joinXpubInput,
      joinKeyInput,
      cosignerPathInput,
      multisigSendBalanceInput,
      multisigTransactionFeeInput,
      multisigRecipientInput,
      proposalCosignerTokenInput,
      shouldRender
    } = this.props;

    const selectedProposalView = shouldRender.SelectedProposal
      ? (<ProposalInfo />)
      : (<div />);
    const proposalUX = shouldRender.ProposalUX
      ? (<ProposalUX handleCreate={handleCreate} />)
      : (<div />);

    return (
      <div>
        <JoinWallet
          handleUpdate={handleUpdate}
          handleCreate={handleCreate}
          cosignerPathInput={cosignerPathInput}
          joinKeyInput={joinKeyInput}
          joinCosignerNameInput={joinCosignerNameInput}
          joinXpubInput={joinXpubInput}
        />
       <CreateProposal
         handleCreate={handleCreate}
         handleUpdate={handleUpdate}
         multisigWalletNameInput={multisigWalletNameInput}
         proposalNameInput={proposalNameInput}
         multisigSendBalanceInput={multisigSendBalanceInput}
         multisigTransactionFeeInput={multisigTransactionFeeInput}
         multisigRecipientInput={multisigRecipientInput}
         proposalCosignerTokenInput={proposalCosignerTokenInput}
       />
      <ProposalList
        handleSelect={handleSelect}
      />
      {selectedProposalView}
      {proposalUX}
    </div>
    )
  }
}

const mapStateToProps = (state, otherProps) => {
  const pluginState = state.plugins[PLUGIN_NAMESPACE] || {};
  const { selectedProposal } = pluginState;

  const shouldRender = {
    ProposalUX: !!selectedProposal,
  };

  return {
    shouldRender,
    ...otherProps,
  }
}

export default connect(mapStateToProps)(MultisigUX);