pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Meeting.sol";

contract TestMeeting {

  function testInitialBalanceUsingDeployedContract() {
    Meeting meta = Meeting(DeployedAddresses.Meeting());

    uint expected = 10000;

  }

  function testInitialBalanceWithNewMetaCoin() {


    // Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

}
