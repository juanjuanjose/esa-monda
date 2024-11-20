import React from 'react';
import UserProfile from '../../components/UserProfile/Userprofile';

const BuyerProfile = () => {
  const buyerData = {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    address: 'Calle Falsa 123',
    picture: '/path/to/buyer-picture.png',
  };

  return <UserProfile profileData={buyerData} profileType="buyer" />;
};

export default BuyerProfile;
