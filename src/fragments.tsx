import { gql } from '@apollo/client';

export const STORE_FRAGMENT = gql`
	fragment StoreParts on Store {
		id
		name
		coverImg
		address
	}
`;

export const CATEGORY_FRAGMENT = gql`
	fragment CategoryParts on Category {
		id
		name
		coverImg
		slug
		productCount
	}
`;

export const PRODUCT_FRAGMENT = gql`
	fragment ProductParts on Product {
		id
		name
		price
		photo
		description
		stocks
		options {
			name
			extra
			choices {
				name
				extra
			}
		}
		category{
			name
		}
		store{
			id
			owner{
				role
			}
		}

	}
`;

export const ORDERS_FRAGMENT = gql`
	fragment OrderParts on Order {
		id
		createdAt
		total
	}
`;

export const FULL_ORDER_FRAGMENT = gql`
	fragment FullOrderParts on Order {
		id
		status
		total
		driver {
			email
		}
		customer {
			email
		}
		store {
			name
		}
	}
`;
