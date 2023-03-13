pragma solidity ^0.8.0;

contract Marketplace1 {

    struct Item {
        uint256 itemId;
        string name;
        string category;
        string description;
        string imageHash;
        address payable seller;
        uint256 price;
        bool isSold;
        bool isDelivered;
    }

    mapping (uint256 => Item) public items;
    uint256 public itemCount;

    address public owner;

    event ItemAdded(uint256 itemId, string name, string category, string description, string imageHash, address seller, uint256 price);
    event ItemBought(uint256 itemId, address buyer);
    event ItemDelivered(uint256 itemId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function addItem(string memory _name, string memory _category, string memory _description, string memory _imageHash, uint256 _price) public onlyOwner {
        itemCount++;
        items[itemCount] = Item(itemCount, _name, _category, _description, _imageHash, payable(msg.sender), _price, false, false);
        emit ItemAdded(itemCount, _name, _category, _description, _imageHash, msg.sender, _price);
    }

    function buyItem(uint256 _itemId) public payable {
        require(items[_itemId].itemId != 0, "Item does not exist");
        require(!items[_itemId].isSold, "Item already sold");
        require(msg.value == items[_itemId].price, "Incorrect amount sent");

        items[_itemId].isSold = true;

        emit ItemBought(_itemId, msg.sender);
    }

    function deliverItem(uint256 _itemId) public {
        require(items[_itemId].itemId != 0, "Item does not exist");
        require(items[_itemId].isSold, "Item has not been sold");
        require(msg.sender == items[_itemId].seller, "Only the seller can perform this action");

        items[_itemId].isDelivered = true;

        payable(owner).transfer(items[_itemId].price);

        emit ItemDelivered(_itemId);
    }
}
