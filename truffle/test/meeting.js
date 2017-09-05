var Meeting = artifacts.require("./Meeting.sol");

contract('Meeting', function(accounts) {
  it("should do something", function() {
    return Meeting.deployed().then(function(instance) {
      return instance.getRooms.call();
    }).then(function(rooms) {
      assert.equal(rooms[1].length, 0, "rooms not empty");
    });
  });
  it("should create a room", function() {
    const expected = 'Test';
    return Meeting.deployed().then(function(instance) {
      return instance.createRoom('hiiii' ,{value:1});
    }).then(function(rooms) {
      console.log(rooms);

      // assert.equal(rooms[1].length, 0, "rooms not empty");
    });

/*    var meta;*/

    //// Get initial balances of first and second account.
    //var account_one = accounts[0];
    //var account_two = accounts[1];

    //var account_one_starting_balance;
    //var account_two_starting_balance;
    //var account_one_ending_balance;
    //var account_two_ending_balance;

    //var amount = 10;

    //return MetaCoin.deployed().then(function(instance) {
      //meta = instance;
      //return meta.getBalance.call(account_one);
    //}).then(function(balance) {
      //account_one_starting_balance = balance.toNumber();
      //return meta.getBalance.call(account_two);
    //}).then(function(balance) {
      //account_two_starting_balance = balance.toNumber();
      //return meta.sendCoin(account_two, amount, {from: account_one});
    //}).then(function() {
      //return meta.getBalance.call(account_one);
    //}).then(function(balance) {
      //account_one_ending_balance = balance.toNumber();
      //return meta.getBalance.call(account_two);
    //}).then(function(balance) {
      //account_two_ending_balance = balance.toNumber();

      //assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      //assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
});
