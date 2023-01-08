pragma solidity ^0.8.7;

contract LogChain {
    struct Product {
        string name;
        string description;
        string imageURL;
        string[] locationStatuses;
        uint256 timestamp;
    }

    // Enum to store different user roles
    enum Role {
        Manufacturer,
        Distributor,
        Retailer
    }

    // Struct to store information about users
    struct User {
        string name;
        string email;
        Role role;
    }

    // Mapping to store the address of the user to the user struct
    mapping(address => User) public users;

    // Add a new user to the mapping
    function addUser(
        string memory _name,
        string memory _email,
        Role _role
    ) public {
        users[msg.sender] = User(_name, _email, _role);
    }

    // Get user details
    function getUser(address _address) public view returns (User memory) {
        return users[_address];
    }

    mapping(uint256 => Product) public products;

    uint256 public productCount = 0;

    function addProduct(
        string memory _name,
        string memory _description,
        string memory _location,
        string memory _imageURL
    ) public {
        // Check if user is a manufacturer or not
        require(
            users[msg.sender].role == Role.Manufacturer,
            "Only manufacturer can add products"
        );
        productCount++;
        products[productCount] = Product(
            _name,
            _description,
            _imageURL,
            new string[](0),
            block.timestamp
        );
        products[productCount].locationStatuses.push(_location);
    }

    function addLocationStatus(uint256 _id, string memory _locationStatus)
        public
    {
        require(users[msg.sender].role != Role(0), "User is not registered");
        Product storage _product = products[_id];
        _product.locationStatuses.push(_locationStatus);
    }

    // Get Product
    function getProduct(uint256 _id) public view returns (Product memory) {
        return products[_id];
    }

    function getProductCount() public view returns (uint256) {
        return productCount;
    }

    //Get all products
    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory _products = new Product[](productCount);
        for (uint256 i = 0; i < productCount; i++) {
            _products[i] = products[i + 1];
        }
        return _products;
    }
}