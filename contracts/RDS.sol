pragma solidity ^0.4.23;

contract RDS {

    address public owner;
    
    constructor () public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Sender not authorized");
        _;
    }
    
    modifier onlyInventoryManager() {
        require(isInventoryManagerRegistered[msg.sender] == true, "Inventory Manager not registered");
        _;
    }
    
    modifier onlySeller() {
        require(isShopkeeperRegistered[msg.sender] == true, "Seller not registered");
        _;
    }
    
    enum Category {APL, BPL}
    
    uint A_wheat = 5;
    uint A_rice = 5;
    uint A_kerosene = 5;
    uint B_wheat = 10;
    uint B_rice = 10;
    uint B_kerosene = 10;
    
    struct Inventory {
        uint wheat;
        uint rice;
        uint kerosene;
    }
    
    struct Shopkeeper {
        address add;
        string ipfsHash;
        Inventory inventory;
    }
    
    struct InventoryManager {
        address add;
        string ipfsHash;
    }
    
    struct Individual {
        bytes24 rationCardId;
        string ipfsHash;
        Category category;
        Inventory inventoryMonth;
    }
    
    event ShopkeeperRegistered(address shopkeeperAddress, string ipfsHash, uint timestamp);
    event IndividualRegistered(bytes24 individualRationCardID, uint8 category, uint timestamp);
    event InventoryManagerRegistered(address inventoryManagerAddress, string ipfsHash, uint timestamp);
    event ResourceAllocatedToShopkeeper(address inventoryManagerAddress, address shopkeeperAddress, uint wheat, uint rice, uint kerosene, uint timestamp);
    event CannotAllocateResourceToCustomer(bytes24, string);
    
    mapping(uint8 => Inventory) categoryAllocationLimit;
    
    mapping(address => bool) isShopkeeperRegistered;
    mapping(address => bool) isInventoryManagerRegistered;
    mapping(bytes24 => bool) isIndividualRegistered;
    
    mapping(address => Shopkeeper) ShopkeeperDetails;
    mapping(address => InventoryManager) InventoryManagerDetails;
    mapping(bytes24 => Individual) IndividualDetails;
    
    address[] shopkeeperAddresses;
    address[] inventoryManagerAddresses;
    bytes24[] individualRationCardIDs;
    
    function setCategoryAllocationLimits(uint8 _category, uint _wheat, uint _rice, uint _kerosene) public onlyOwner returns (bool, string) {
        if(_category > 1) {
            return (false, "Invalid category");
        }
        categoryAllocationLimit[_category].wheat = _wheat;
        categoryAllocationLimit[_category].rice = _rice;
        categoryAllocationLimit[_category].kerosene = _kerosene;
        return (true, "Category Allocation Limits Set");
    }
    
    function registerShopkeeper(address _shopkeeperAddress, string _ipfsHash) onlyOwner public returns (bool, string) {
        if(isShopkeeperRegistered[_shopkeeperAddress] == true) {
            return (false, "Shopkeeper already registered");
        }
        isShopkeeperRegistered[_shopkeeperAddress] = true;
        Shopkeeper memory shopkeeper;
        shopkeeper.add = _shopkeeperAddress;
        shopkeeper.ipfsHash = _ipfsHash;
        ShopkeeperDetails[_shopkeeperAddress] = shopkeeper;
        shopkeeperAddresses.push(_shopkeeperAddress);
        emit ShopkeeperRegistered(_shopkeeperAddress, _ipfsHash, now);
        return (true, "Shopkeeper registered");
    }
    
    function registerInventoryManager(address _inventoryManagerAddress, string _ipfsHash) onlyOwner public returns (bool, string) {
        if(isInventoryManagerRegistered[_inventoryManagerAddress] == true) {
            return (false, "Inventory Manager already registered");
        }
        isInventoryManagerRegistered[_inventoryManagerAddress] = true;
        InventoryManager memory inventorymanager;
        inventorymanager.add = _inventoryManagerAddress;
        inventorymanager.ipfsHash = _ipfsHash;
        InventoryManagerDetails[_inventoryManagerAddress] = inventorymanager;
        inventoryManagerAddresses.push(_inventoryManagerAddress);
        emit InventoryManagerRegistered(_inventoryManagerAddress, _ipfsHash, now);
        return (true, "Inventory Manager registered");
    }
    
    function registerIndividual(bytes24 _individualRationCardID, uint8 _category, string _ipfsHash) onlyOwner public returns (bool, string) {
        if(_category > 1) {
            return (false, "Invalid category");
        }
        if(isIndividualRegistered[_individualRationCardID] == true) {
            return (false, "Individual already registered");
        }
        isIndividualRegistered[_individualRationCardID] = true;
        Individual memory individual;
        individual.rationCardId = _individualRationCardID;
        individual.category = Category(_category);
        individual.ipfsHash = _ipfsHash;
        IndividualDetails[_individualRationCardID] = individual;
        individualRationCardIDs.push(_individualRationCardID);
        emit IndividualRegistered(_individualRationCardID, _category, now);
        return (true, "Individual registered");
    }
    
    function allocateResourceToShopkeeper(uint _wheat, uint _rice, uint _kerosene, address _shopkeeperAddress) onlyInventoryManager public returns (bool, string) {
        if(isShopkeeperRegistered[_shopkeeperAddress] == false) {
            return (false, "Shopkeeper not registered");
        }
        Inventory memory inventory;
        inventory.wheat = _wheat;
        inventory.rice = _rice;
        inventory.kerosene = _kerosene;
        ShopkeeperDetails[_shopkeeperAddress].inventory = inventory;
        emit ResourceAllocatedToShopkeeper(msg.sender, _shopkeeperAddress, _wheat, _rice, _kerosene, now);
        return (true, "Resource allocated to Shopkeeper");
    }
    
    function getShopkeeperAddresses() public view returns (address[]) {
        return shopkeeperAddresses;
    }
    
    function getInventoryManagerAddresses() public view returns (address[]) {
        return inventoryManagerAddresses;
    }
    
    function getIndividualRationCardIDs() public view returns (bytes24[]) {
        return individualRationCardIDs;
    }
    
    function distributeToCustomers(bytes24 _individualRationCardID, uint _month, uint _wheat, uint _rice, uint _kerosene) public onlySeller returns (bool, string) {
        if (isIndividualRegistered[_individualRationCardID] == false) {
        return (false, "Individual Not Registered");
        }
    
    //validate _month
    //allocate commodities after checking limit
    //store month
    
    uint lastWheatAlloc = IndividualDetails[_individualRationCardID].inventoryMonth.wheat;
    uint lastRiceAlloc = IndividualDetails[_individualRationCardID].inventoryMonth.rice;
    uint lastKeroAlloc = IndividualDetails[_individualRationCardID].inventoryMonth.kerosene;
    
    uint8 _categ = uint8(IndividualDetails[_individualRationCardID].category);
    
    if (_wheat != 0) {
        if ((lastWheatAlloc != 0 && lastWheatAlloc == _month) || _wheat > categoryAllocationLimit[_categ].wheat) {
            emit CannotAllocateResourceToCustomer(_individualRationCardID, 'wheat');
        } else {
            lastWheatAlloc = _month;
        }
    }
    
    if (_rice != 0) {
        if ((lastRiceAlloc != 0 && lastRiceAlloc == _month) || _wheat > categoryAllocationLimit[_categ].rice) {
            emit CannotAllocateResourceToCustomer(_individualRationCardID, 'rice');
        } else {
            lastRiceAlloc = _month;
        }
    }
    
    if (_kerosene != 0) {
        if ((lastKeroAlloc != 0 && lastKeroAlloc == _month) || _wheat > categoryAllocationLimit[_categ].kerosene) {
            emit CannotAllocateResourceToCustomer(_individualRationCardID, 'kerosene');
        } else {
            lastKeroAlloc = _month;
        }
    }
    return (true, "Resources distributed to Customer");
    }
}