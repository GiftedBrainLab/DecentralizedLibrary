// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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
      string category;
      bool read;
    }

    event LibraryItemCreated (
      uint256 indexed tokenId,
      address creator,
      address owner,
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
        category,
        false
      );

      _transfer(msg.sender, address(this), tokenId);
      emit LibraryItemCreated(
        tokenId,
        msg.sender,
        address(this),
        category,
        false
      );
    }
// Return book back to library 
    function returnBook(uint256 tokenId, string memory category) public payable {
      require(idToLibraryItem[tokenId].owner == msg.sender, "Only the one in possesion of the book can perform this operation");
      idToLibraryItem[tokenId].read = false;
      idToLibraryItem[tokenId].creator = payable(msg.sender);
      idToLibraryItem[tokenId].owner = payable(address(this));
      idToLibraryItem[tokenId].category = category;
      _itemsRead.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }
    /* Select a book and mark as read  */
    function createLibraryRead(uint256 tokenId) public payable {
      string memory category = idToLibraryItem[tokenId].category;
      idToLibraryItem[tokenId].owner = payable(msg.sender);
      idToLibraryItem[tokenId].creator = payable(address(0));
      idToLibraryItem[tokenId].read = true;
      idToLibraryItem[tokenId].category = category;
      _itemsRead.increment();
      // _transfer(address(this), msg.sender, tokenId);
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
    /* Returns only items that a user has read */
    function fetchReadEbooks() public view returns (LibraryItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToLibraryItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToLibraryItem[i + 1].read == true) {
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
    function fetchOneItem(uint256 tokenId) public returns (LibraryItem memory) {
      _itemsRead.increment();
      return idToLibraryItem[tokenId];
    }
    /* Returns all unread ebook items */
    function fetchUnreadLibraryItems() public view returns (LibraryItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint unreadItemCount = _tokenIds.current() - _itemsRead.current();
      uint currentIndex = 0;

      LibraryItem[] memory items = new LibraryItem[](unreadItemCount);
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