// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Profile is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address owner;

    modifier onlyOwner {
       require(msg.sender == owner);
      _;
   }

    constructor() ERC721("DLibraryProfile", "DLP") {
      owner = msg.sender;
    }

    mapping(uint256 => UserProfile) private idToProfile;

    struct UserProfile {
        uint256 tokenId;
        address creator;
        string quote;
        string user_type;
        uint256 timestamp;
    }

    event ProfileCreated (
        uint256 indexed tokenId,
        address user,
        string quote,
        string user_type,
        uint256 timestamp
    );

    function createProfile(string memory tokenURI, string memory quote, string memory user_type) public returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      newProfile(newTokenId, quote, user_type);
      return newTokenId;
    }

   function newProfile(uint256 tokenId, string memory quote, string memory user_type) private {

      idToProfile[tokenId] =  UserProfile(
        tokenId,
        msg.sender,
        quote,
        user_type,
        block.timestamp
      );

      emit ProfileCreated(
        tokenId,
        msg.sender,
        quote,
        user_type,
        block.timestamp
      );
    }

    function updateProfile(uint256 tokenId, string memory quote) public {
      require(owner == msg.sender, "Only owner can update profile.");
          idToProfile[tokenId].quote = quote;
      }   

   function getUserProfile () public view returns (UserProfile[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToProfile[i + 1].creator == msg.sender) {
          itemCount += 1;
        }
      }

      UserProfile[] memory items = new UserProfile[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToProfile[i + 1].creator == msg.sender) {
          uint currentId = i + 1;
          UserProfile storage currentItem = idToProfile[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    
    }

    function getProfileCount() public view returns (uint256) {
        return _tokenIds.current();
    }

}

