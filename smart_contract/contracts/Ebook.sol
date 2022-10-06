// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract Ebook is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsRead;

    address payable owner;

    mapping(uint256 => LibraryItem) private idToLibraryItem;

    struct LibraryItem {
      uint256 tokenId;
      address payable creator;
      address payable owner;
      address payable reader;
      string category;
      bool read;
    }

    event LibraryItemCreated (
      uint256 indexed tokenId,
      address creator,
      address owner,
      address reader,
      string category,
      bool read
    );

    constructor() ERC721("Decentralized Library Ebook", "DLibB") {
      owner = payable(msg.sender);
    }

     /* Mints an ebook and lists it in the Library Catalogue*/
    function createEbook(string memory tokenURI, string memory category) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createLibraryItem(newTokenId, category);
      return newTokenId;
    }

    function createLibraryItem(
      uint256 tokenId, string memory category
    ) private {

      idToLibraryItem[tokenId] =  LibraryItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        payable(address(0)),
        category,
        false
      );

      _transfer(msg.sender, address(this), tokenId);
      emit LibraryItemCreated(
        tokenId,
        msg.sender,
        address(this),
        address(0),
        category,
        false
      );
    }
// Return book back to library 
    function returnBook(uint256 tokenId, string memory category) public payable {
      address payable creator = idToLibraryItem[tokenId].creator;
      require(idToLibraryItem[tokenId].owner == msg.sender, "Only the one in possesion of the book can perform this operation");
      idToLibraryItem[tokenId].read = false;
      idToLibraryItem[tokenId].creator = creator;
      idToLibraryItem[tokenId].owner = payable(address(this));
      idToLibraryItem[tokenId].reader = payable(address(0));
      idToLibraryItem[tokenId].category = category;
      _itemsRead.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }

    /* Select a book and mark as read  */
    function createLibraryRead(uint256 tokenId) public payable {
       address payable creator = idToLibraryItem[tokenId].creator;
      idToLibraryItem[tokenId].owner = payable(address(this));
      idToLibraryItem[tokenId].read = true;
      idToLibraryItem[tokenId].creator = creator;
       idToLibraryItem[tokenId].reader = payable(msg.sender);
      _itemsRead.increment();
      _transfer(address(this), msg.sender, tokenId);
    }

  /* Returns all ebook items */
    function fetchAllLibraryItems() public view returns (LibraryItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint currentIndex = 0;

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToLibraryItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          LibraryItem storage currentItem = idToLibraryItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

 /* Returns only one items by token id   */
    function fetchOneNFT(uint256 _tokenId) public view returns (LibraryItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToLibraryItem[i + 1].tokenId == _tokenId) {
          itemCount += 1;
        }
      }

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToLibraryItem[i + 1].tokenId == _tokenId) {
          uint currentId = i + 1;
          LibraryItem storage currentItem = idToLibraryItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items by there category */
    function fetchItemsByCategory( string memory category) public view returns (LibraryItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (keccak256(abi.encodePacked(idToLibraryItem[i + 1].category)) == keccak256(abi.encodePacked(category))) {
          itemCount += 1;
        }
      }

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
       if (keccak256(abi.encodePacked(idToLibraryItem[i + 1].category)) == keccak256(abi.encodePacked(category))) {
          uint currentId = i + 1;
          LibraryItem storage currentItem = idToLibraryItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }


      /* Returns all read ebook items by an address */
    function fetchMyEbooks() public view returns (LibraryItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint currentIndex = 0;

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToLibraryItem[i + 1].reader == msg.sender && idToLibraryItem[i + 1].read == true) {
          uint currentId = i + 1;
          LibraryItem storage currentItem = idToLibraryItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns item read */
    function fetchReader() public view returns (LibraryItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToLibraryItem[i + 1].read == true) { 
          itemCount += 1;
        }
      }

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
       if (idToLibraryItem[i + 1].reader == msg.sender) {
          uint currentId = i + 1;
          LibraryItem storage currentItem = idToLibraryItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items a creator has created */
    function fetchItemsListed() public view returns (LibraryItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToLibraryItem[i + 1].creator == msg.sender) {
          itemCount += 1;
        }
      }

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToLibraryItem[i + 1].creator == msg.sender) {
          uint currentId = i + 1;
          LibraryItem storage currentItem = idToLibraryItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only One items by tokenId */
    function fetchOneItem(uint256 tokenId) public view returns (LibraryItem memory) {
      // _itemsRead.increment();
      return idToLibraryItem[tokenId];
    }

    /* Returns all unread ebook items */
    function fetchUnreadLibraryItems() public view returns (LibraryItem[] memory) {
      uint itemCount = _tokenIds.current();
     // uint unreadItemCount = _tokenIds.current() - _itemsRead.current();
      uint currentIndex = 0;

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToLibraryItem[i + 1].read == false) {
          uint currentId = i + 1;
          LibraryItem storage currentItem = idToLibraryItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
    /* Get total books read  */
    function getTotalRead() public view returns (uint256) {
      return _itemsRead.current();
    }
        /* Get total books in Library read  */
        function getTotalItems() public view returns (uint256) {
      return _tokenIds.current();
    }

}