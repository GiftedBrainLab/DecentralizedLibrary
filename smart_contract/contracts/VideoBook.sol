// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract VideoBook is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsWatched;

    address payable owner;

    mapping(uint256 => LibraryItem) private idToLibraryItem;

    struct LibraryItem {
      uint256 tokenId;
      address payable creator;
      address payable owner;
      address payable viewer;
      string category;
      bool watched;
    }

    event LibraryItemCreated (
      uint256 indexed tokenId,
      address creator,
      address owner,
      address viewer,
      string category,
      bool watched
    );

    constructor() ERC721("Decentralized Library video", "DLibB") {
      owner = payable(msg.sender);
    }

     /* Mints an video and lists it in the Library Catalogue*/
    function createVideo(string memory tokenURI, string memory category) public payable returns (uint) {
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
// Return video back to library 
    function returnVideo(uint256 tokenId, string memory category) public payable {
      address payable creator = idToLibraryItem[tokenId].creator;
      require(idToLibraryItem[tokenId].owner == msg.sender, "Only the one in possesion of the video can perform this operation");
      idToLibraryItem[tokenId].watched = false;
      idToLibraryItem[tokenId].creator = creator;
      idToLibraryItem[tokenId].owner = payable(address(this));
      idToLibraryItem[tokenId].viewer = payable(address(0));
      idToLibraryItem[tokenId].category = category;
      _itemsWatched.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }

    /* Select a video and mark as watched  */
    function createLibraryWatched(uint256 tokenId) public payable {
       address payable creator = idToLibraryItem[tokenId].creator;
      idToLibraryItem[tokenId].owner = payable(address(this));
      idToLibraryItem[tokenId].watched = true;
      idToLibraryItem[tokenId].creator = creator;
       idToLibraryItem[tokenId].viewer = payable(msg.sender);
      _itemsWatched.increment();
      _transfer(address(this), msg.sender, tokenId);
    }

  /* Returns all video items */
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

      /* Returns all watched video items by an address */
    function fetchMyVideos() public view returns (LibraryItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint currentIndex = 0;

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToLibraryItem[i + 1].viewer == msg.sender && idToLibraryItem[i + 1].watched == true) {
          uint currentId = i + 1;
          LibraryItem storage currentItem = idToLibraryItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns item viewed */
    function fetchViewer() public view returns (LibraryItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToLibraryItem[i + 1].watched == true) { 
          itemCount += 1;
        }
      }

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
       if (idToLibraryItem[i + 1].viewer == msg.sender) {
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
      // _itemsWatched.increment();
      return idToLibraryItem[tokenId];
    }

    /* Returns all unwatched video items */
    function fetchUnwatchedLibraryItems() public view returns (LibraryItem[] memory) {
      uint itemCount = _tokenIds.current();
     // uint unwatchedItemCount = _tokenIds.current() - _itemsWatched.current();
      uint currentIndex = 0;

      LibraryItem[] memory items = new LibraryItem[](itemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToLibraryItem[i + 1].watched == false) {
          uint currentId = i + 1;
          LibraryItem storage currentItem = idToLibraryItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
    /* Get total videos watched  */
    function getTotalWatched() public view returns (uint256) {
      return _itemsWatched.current();
    }
        /* Get total videos in Library watched  */
        function getTotalItems() public view returns (uint256) {
      return _tokenIds.current();
    }

}