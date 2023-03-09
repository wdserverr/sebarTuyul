// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SebarTuyul {
    address payable owner;
    
    constructor() {
        owner = payable(msg.sender);
    }
    
    function kirimKeTuyul(address payable[] memory recipients, uint256 amount) public payable {
        require(recipients.length > 0, "Penerima harus berisi setidaknya 1 address dan berupa array");
        require(msg.value == amount * recipients.length, "Jumlah kurang, address*jumlah ");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            recipients[i].transfer(amount);
        }
    }
    
    function withdraw() public {
        require(msg.sender == owner, "Hanya pembuat/deployer yang bisa withdraw!");
        
        uint balanceBeforeWithdraw = address(this).balance;
        
        // Transfer all funds to the contract owner
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send");
        
        // Ensure that the entire balance was withdrawn
        require(address(this).balance == balanceBeforeWithdraw - address(this).balance, "Balance mismatch after withdraw");
    }
}
