// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokiemonMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
    }

    IERC721 public immutable tokiemon;
    address public devWallet;
    uint256 public devFeePercentage; // e.g., 5% = 500 (basis points)

    mapping(uint256 => Listing) public listings;

    /// EVENTS
    event Listed(address seller, uint256 tokenId, uint256 price);
    event Sold(address buyer, uint256 tokenId, uint256 price);
    event Cancelled(address seller, uint256 tokenId);

    /// ERRORS
    error ZeroAddressNotAllowed();
    error ZeroPriceNotAllowed();
    error OnlyTokiemonOwner(uint tokenId, address sender);
    error MarketplaceNotApproved();
    error TokiemonNotListed(uint tokenId);
    error IncorrectValueSent(uint listingPrice, uint value);

    constructor(address _tokiemon, address _devWallet, uint256 _devFeePercentage) {
        require(_tokiemon != address(0), ZeroAddressNotAllowed());
        require(_devWallet != address(0), ZeroAddressNotAllowed());
        tokiemon = IERC721(_tokiemon);
        devWallet = _devWallet;
        devFeePercentage = _devFeePercentage;
    }

    function listToken(uint256 tokenId, uint256 price) external {
        require(price > 0, ZeroPriceNotAllowed());
        require(tokiemon.ownerOf(tokenId) == msg.sender, OnlyTokiemonOwner(tokenId, msg.sender));
        require(tokiemon.isApprovedForAll(msg.sender, address(this)), MarketplaceNotApproved());

        listings[tokenId] = Listing({seller: msg.sender, price: price});
        emit Listed(msg.sender, tokenId, price);
    }

    function cancelListing(uint256 tokenId) external {
        Listing memory listing = listings[tokenId];
        require(listing.seller != address(0), TokiemonNotListed(tokenId));
        require(listing.seller == msg.sender, OnlyTokiemonOwner(tokenId, msg.sender));

        delete listings[tokenId];
        emit Cancelled(msg.sender, tokenId);
    }

    function buyToken(uint256 tokenId) external payable nonReentrant {
        Listing memory listing = listings[tokenId];
        require(listing.seller != address(0), TokiemonNotListed(tokenId));
        require(msg.value == listing.price, IncorrectValueSent(listing.price, msg.value));

        // Calculate dev fee and seller payment
        uint256 devFee = (listing.price * devFeePercentage) / 10000;
        uint256 sellerPayment = listing.price - devFee;

        // Transfer funds
        payable(devWallet).transfer(devFee);
        payable(listing.seller).transfer(sellerPayment);

        // Transfer NFT
        tokiemon.safeTransferFrom(listing.seller, msg.sender, tokenId);

        // Remove listing
        delete listings[tokenId];
        emit Sold(msg.sender, tokenId, listing.price);
    }

    function getListing(uint256 tokenId) external view returns (Listing memory) {
        return listings[tokenId];
    }
}
