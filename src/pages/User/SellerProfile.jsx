import React from 'react';
import UserProfile from '../../components/UserProfile/Userprofile';

const SellerProfile = () => {
  const sellerData = {
    name: 'Ana Rodríguez',
    email: 'ana@tienda.com',
    address: 'Calle Comercio 456',
    picture: '/path/to/seller-picture.png',
    storeName: 'Tienda Ana',
    products: '15 productos',
  };

  return <UserProfile profileData={sellerData} profileType="seller" />;
};

export default SellerProfile;
