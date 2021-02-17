// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

abstract contract prana is ERC721{ //abstract need to be deleted


    using Counters for Counters.Counter;

    //to automate tokenId generation
    Counters.Counter private _tokenIdTracker;

    constructor() ERC721("prana:", "PCT") {  //PCT for prana: content token
    
    deployer = msg.sender;
    
    }

    // deployer address
    address deployer;
    
    // address of the helpercontract, need to be fed in manually by the deployer.
    address pranaHelperAddress;

    
    //struct that represents a book
    struct BookInfo{
        string encryptedBookDataHash;
        string unencryptedBookDetailsCID;
        address payable publisherAddress;
        uint256 bookPrice;
        uint256 transactionCut;
        uint256 bookSales;
    }

    // mapping for all books
    // ISBN is the key, its corresponding details is the value
    mapping(uint256 => BookInfo) internal booksInfo;


    //struct that represents a token/particular copy
    struct TokenDetails{
        uint256 isbn;
        uint256 copyNumber;
        // resale aspects
        uint256 resalePrice;
        bool isUpForResale;
        //Renting aspects (gonna be hard to properly figure out renting)
        uint256 rentingPrice;
        bool isUpForRenting;
        address rentee;
        uint256 rentedAtBlock;
    }


    // tokenId to TokenDetails mapping
    mapping (uint256 => TokenDetails) internal tokenData;

    //EVENTS
    //Event to emit when a new book is published with its ISBN and publisher address
    event BookPublished(address indexed publisher, uint256 indexed isbn,
    string bookCoverAndDetails, uint256 indexed price, uint256 transactionCut);

    //Event to emit when a tokenOwner puts out a token for sale
    event TokenForSale(uint256 indexed resalePrice, uint256 indexed isbn, uint256 indexed tokenId);

    //Event to emit when the tokenOwner puts out a token for renting
    event TokenForRenting(uint256 indexed rentingPrice, uint256 indexed isbn, uint256 indexed tokenId);

    //Event to emit when a token is rented
    event TokenRented(uint256 indexed isbn, uint256 indexed tokenId, address indexed rentee);

    // function to pass in the adddresses of each of the contract
    // so that they may refer to each other. Crude version
    function setPranaHelperAddress(address _pranaHelperAddress) public {
        require(msg.sender == deployer, "You're not the contract deployer!");
        pranaHelperAddress = _pranaHelperAddress;
    }



    //function to add book details into the chain i.e. publish the book
    function publishBook(
        string memory _encryptedBookDataHash, //TOCHECK: bytes32 vs bytes memory
        uint256 _isbn,
        uint256 _price,
        string memory _unencryptedBookDetailsCID,
        uint256 _transactionCut)
        public {
        require(booksInfo[_isbn].publisherAddress==address(0), "This book has already been published!");
        require(_transactionCut < 80, "Your cut can't be more than 80% of the total"); // no need to check the lower limit, because unsigned int.
        booksInfo[_isbn].encryptedBookDataHash = _encryptedBookDataHash;
        booksInfo[_isbn].publisherAddress = msg.sender;
        booksInfo[_isbn].bookPrice = _price;
        booksInfo[_isbn].unencryptedBookDetailsCID = _unencryptedBookDetailsCID;
        booksInfo[_isbn].transactionCut = _transactionCut;
        booksInfo[_isbn].bookSales = 0;

        //event that serves as an advertisement
        //last argument might be needed to change back to price
        emit BookPublished(msg.sender, _isbn, _unencryptedBookDetailsCID, _price, _transactionCut);

    }

    // to purchase new books from the publisher
    function directPurchase(uint256 _isbn) public payable returns (bool) {
        //to revert back if the buyer doesn't have the price set by the author.
        require(booksInfo[_isbn].publisherAddress != address(0),"ISBN does not exist !");
        require(msg.value >= booksInfo[_isbn].bookPrice,"Insufficient funds ! Please pay the price as set by the author.");
        //a new tokenId is generated, and a new token is minted with that ID.
        uint256 tokenId = _tokenIdTracker.current();
        _safeMint(msg.sender, tokenId);
        _tokenIdTracker.increment();
        //once a token's succesfully minted, update the various details.
        booksInfo[_isbn].bookSales++;

        tokenData[tokenId].isbn = _isbn;
        tokenData[tokenId].copyNumber = booksInfo[_isbn].bookSales;
        tokenData[tokenId].rentee = address(0);
        tokenData[tokenId].rentedAtBlock = 0;
        (booksInfo[_isbn].publisherAddress).transfer(msg.value);
        return true;
    }



    






}