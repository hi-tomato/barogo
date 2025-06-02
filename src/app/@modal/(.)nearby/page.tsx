// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// export default function NearbyPage() {
//   const [location, setLocation] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);
//   const [restaurants, setRestaurants] = useState([]);
//   const getCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLocation({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
//     });
//   };

//   const fetchNearbyRestaurants = async (lat: number, lng: number) => {
//     const response = await fetch(
//       `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&x=${lng}&y=${lat}&radius=1000&size=10`,
//       {
//         headers: {
//           Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
//         },
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     return data.documents;
//   };

//   useEffect(() => {
//     if (location) {
//       fetchNearbyRestaurants(location.lat, location.lng).then(setRestaurants);
//     }
//   }, [location]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h2>내 주변 맛집</h2>
//       </div>
//     </div>
//   );
// }
