const express = require("express");
const router = new express.Router();
const FavouritesController = require("../Controllers/FavouritesController");


// Update favourites route
router.post('/:id/favourites/add', FavouritesController.addToFavourites);
router.delete('/:id/favourites/all', FavouritesController.clearUserFavourites);
router.delete('/:id/favourites/:favouritesItemId', FavouritesController.deleteFavouritesItemById);
router.get('/:id/favourites', FavouritesController.getFavouritesItems);
router.get('/:id/favourites/check/:product_id', FavouritesController.checkProductInFavourites);




module.exports = router;