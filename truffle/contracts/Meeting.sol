pragma solidity ^0.4.4;

contract Meeting {
	// mapping (address => uint) balances;
	//mapping (string => uint) nameRoom;
  address public owner;
  uint roomInt;
	mapping (uint => bytes32) rooms;
	mapping (uint => Schedule) schedule;
	// mapping (uint => uint[]) personSchedule;

	event MeetingCreated(uint id);
	event MeetingRemoved();

	function Meeting() {
    roomInt = 0;
    owner = msg.sender;
	}

	struct Schedule {
		bytes32 name;
		uint size;
		ScheduleEntry[] entries;
	}

	struct ScheduleEntry {
		uint start;
		uint end;
	}

	//function sendCoin(address receiver, uint amount) returns(bool sufficient) {
	//	if (balances[msg.sender] < amount) return false;
	//	balances[msg.sender] -= amount;
	//	balances[receiver] += amount;
  //  msg.value
	//	Transfer(msg.sender, receiver, amount);
	//	return true;
	//}

	// function getBalanceInEth(address addr) returns(uint){
  //	return ConvertLib.convert(getBalance(addr),2);
	// }

	// function getBalance(address addr) returns(uint) {
	//	return balances[addr];
	// }

  // function stringToBytes32(string memory source) returns (bytes32 result) {
  //   assembly {
  //       result := mload(add(source, 32))
  //   }
  // }

  function createRoom(bytes32 room) payable costs(1 ether) {
     roomInt += 1;
     rooms[roomInt] = room;
 		 MeetingCreated(roomInt);
  }

  function removeRoom(uint id) {
     roomInt -= 1;
     delete rooms[id];
 		 MeetingRemoved();
  }

  function getRoom(uint id) constant returns (bytes32) {
     return rooms[id];
  }

  function getRooms() constant returns (uint[], bytes32[]) {
     var r = new bytes32[](roomInt);
     var ids = new uint[](roomInt);

		 for(uint i=0; i < roomInt; i++) {
        ids[i] = i;
			  r[i] = rooms[i];
     }	
     return (ids, r);
  }

  modifier costs(uint _amount) {
        require(msg.value >= _amount);
        _;
        if (msg.value > _amount)
            msg.sender.send(msg.value - _amount);
  }
	
	function overlap(uint s1, uint e1, uint s2, uint e2) returns (bool) {
		return (s1 < e2 && s2 < e1);
			
	}
	
  // TODO: interval tree
	function isBooked(uint room, uint start, uint end) constant returns (bool) {
		Schedule s = schedule[room];
		for(uint i = 0; i < s.size; i++) {
			var entry = s.entries[i];
			if(overlap(start, end, entry.start, entry.end)) {
				return true;
			}
		}

		return false;
	}

	function book(uint room, uint start, uint end) private {
		Schedule s = schedule[room];
		bytes32 name = rooms[room];
		if( s.name != name ) {
			s.name = name;
		}
		s.entries.push(ScheduleEntry(start,end));
		s.size = s.size + 1;
		schedule[room] = s;
	}

  function createMeeting(uint room, uint start, uint end) payable costs(10 ether) {
    // does room exist?
		if(room >= roomInt) throw;
		if(isBooked(room, start, end)) throw;		
		
		book(room, start, end);
  }

  // function bookPerson(address attendee) payable costs(1 ether) {
    // check schedule
    // check payment
  //}

}
