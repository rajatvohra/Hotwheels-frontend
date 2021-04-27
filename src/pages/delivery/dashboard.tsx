import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { FULL_ORDER_FRAGMENT } from '../../fragments';
import { coockedOrders } from '../../__generated__/coockedOrders';
import {  useHistory } from 'react-router-dom';
import { takeOrder, takeOrderVariables } from '../../__generated__/takeOrder';

const COOCKED_ORDERS_SUBSCRIPTION = gql`
	subscription coockedOrders {
		packedOrders {
			...FullOrderParts
		}
	}
	${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
	mutation takeOrder($input: TakeOrderInput!) {
		takeOrder(input: $input) {
			ok
			error
		}
	}
`;

interface ICoords {
	lat: number;
	lng: number;
}

interface IDriverProps {
	lat: number;
	lng: number;
	$hover?: any;
}
const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚖</div>;

export const Dashboard = () => {
	const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
	const [map, setMap] = useState<google.maps.Map>();
	const [maps, setMaps] = useState<any>();
	//const x=0.15; //for display purposes/
	const x=0;
	// @ts-ignore
	const onSucces = ({ coords: { latitude, longitude } }: Position) => {
		setDriverCoords({ lat: latitude, lng: longitude });
	};
	// @ts-ignore
	const onError = (error: PositionError) => {
		console.log(error,"this ????");
	};
	useEffect(() => {
		navigator.geolocation.watchPosition(onSucces, onError, {
			enableHighAccuracy: true,
		});
	}, []);
	useEffect(() => {
		if (map && maps) {
			map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
			/* const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
        },
        (results, status) => {
          console.log(status, results);
        }
      ); */
		}
	}, [driverCoords.lat, driverCoords.lng]);
	const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
		map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
		setMap(map);
		setMaps(maps);
	};

	const { data: coockedOrdersData } = useSubscription<coockedOrders>(
		COOCKED_ORDERS_SUBSCRIPTION
	);
	console.log(coockedOrdersData?.packedOrders.store?._geoloc.lat!,
		coockedOrdersData?.packedOrders.store?._geoloc.lng!,"store loc");
	const makeRoute = () => {
		if (map) {
			const directionsService = new google.maps.DirectionsService();
			const directionsRenderer = new google.maps.DirectionsRenderer({
				polylineOptions: {
					strokeColor: '#000',
					strokeOpacity: 1,
					strokeWeight: 5,
				},
			});
			directionsRenderer.setMap(map);
			directionsService.route(
				{
					origin: {
						location: new google.maps.LatLng(
							driverCoords.lat+x,
							driverCoords.lng+x
						),
					},
					destination: {
						location: new google.maps.LatLng(
							coockedOrdersData?.packedOrders.store?._geoloc.lat!,
							coockedOrdersData?.packedOrders.store?._geoloc.lng!
						),
					},
					travelMode: google.maps.TravelMode.DRIVING,
				},
				(result) => {
					directionsRenderer.setDirections(result);
				}
			);
		}
	};
	useEffect(() => {
		if (coockedOrdersData?.packedOrders.id) {
			makeRoute();
		}
	}, [coockedOrdersData]);
	const history = useHistory();
	const onCompleted = (data: takeOrder) => {
		if (data.takeOrder.ok) {
			history.push(`/orders/${coockedOrdersData?.packedOrders.id}`);
		}
	};
	const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
		TAKE_ORDER_MUTATION,
		{
			onCompleted,
		}
	);
	const triggerMutation = (orderId: number) => {
		takeOrderMutation({
			variables: {
				input: {
					id: orderId,
				},
			},
		});
	};
	console.log(driverCoords,"driver cords");
	return (
		<div className="min-h-screen h-max">
			<div
				className="overflow-hidden"
				style={{ width: window.innerWidth, height: '50vh' }}
			>
				<GoogleMapReact
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={onApiLoaded}
					defaultZoom={16}
					draggable={true}
					defaultCenter={{
						lat: 28.643410,
						lng: 77.189360,
					}}
					bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_API_KEY}` }}
				></GoogleMapReact>
			</div>
			<div className=" max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
				{coockedOrdersData?.packedOrders.store ? (
					<>
						<h1 className="text-center  text-3xl font-medium">
							New Cooked Order
						</h1>
						<h1 className="text-center my-3 text-2xl font-medium">
							Pick it up soon @ {coockedOrdersData?.packedOrders.store?.name}
						</h1>
						<button
							onClick={() =>
								triggerMutation(coockedOrdersData?.packedOrders.id)
							}
							className="btn w-full  block  text-center mt-5"
						>
							Accept Challenge &rarr;
						</button>
					</>
				) : (
					<h1 className="text-center  text-3xl font-medium">
						No orders yet...
					</h1>
				)}
			</div>
		</div>
	);
};
