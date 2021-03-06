import { Page } from '@designr/page';

export const page: Page[] = [
	/*
	{
		id: 1000,
		slug: '/',
		url: 'https://actarian.github.io/designr/#/',
		title: 'Duis luctus ullamcorper risus imperdiet maximus.',
		abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
		description: '<p>Ut ultrices condimentum urna, et aliquam orci semper ut. Donec eleifend sapien vel vestibulum cursus. Duis luctus ullamcorper risus imperdiet maximus. Vestibulum volutpat mauris diam, eget tempor lorem ultrices a.</p><p>Suspendisse non aliquet arcu. Praesent a enim accumsan orci semper venenatis non eget lorem. Praesent rhoncus molestie lectus id semper.</p>',
		component: 'HomeComponent',
		type: 1,
		active: true,
		meta: {
			title: 'Page Meta Title',
			description: 'Page Meta Description',
			keywords: 'keyword,keyword',
			robots: 'index,follow'
		},
		images: [{
			id: 0,
			type: 1,
			description: 'Image description',
			fileName: 'placeholder',
			url: 'placeholder',
		}],
		related: [{
			id: 10000,
			slug: '/related-0',
			url: 'https://actarian.github.io/designr/#/related-0',
			name: 'Related 00',
			title: 'Related 00',
			abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
			images: [{
				id: 0,
				type: 1,
				description: 'Image description',
				fileName: 'placeholder',
				url: 'placeholder',
			}],
			component: 'CardsComponent',
			type: 1,
			relationType: 3,
		}, {
			id: 10001,
			slug: '/related-1',
			url: 'https://actarian.github.io/designr/#/related-1',
			name: 'Related 01',
			title: 'Related 01',
			abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
			images: [{
				id: 0,
				type: 1,
				description: 'Image description',
				fileName: 'placeholder',
				url: 'placeholder',
			}],
			component: 'TextCenterComponent',
			type: 1,
			relationType: 3,
		}, {
			id: 10002,
			slug: '/related-2',
			url: 'https://actarian.github.io/designr/#/related-2',
			name: 'Related 02',
			title: 'Related 02',
			abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
			images: [{
				id: 0,
				type: 1,
				description: 'Image description',
				fileName: 'placeholder',
				url: 'placeholder',
			}],
			component: 'TextLeftComponent',
			type: 1,
			relationType: 3,
		}, {
			id: 10003,
			slug: '/related-3',
			url: 'https://actarian.github.io/designr/#/related-3',
			name: 'Related 03',
			title: 'Related 03',
			abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
			images: [{
				id: 0,
				type: 1,
				description: 'Image description',
				fileName: 'placeholder',
				url: 'placeholder',
			}],
			component: 'TextRightComponent',
			type: 1,
			relationType: 3,
		}, {
			id: 10004,
			slug: '/related-4',
			url: 'https://actarian.github.io/designr/#/related-4',
			name: 'Related 04',
			title: 'Related 04',
			abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
			images: [{
				id: 0,
				type: 1,
				description: 'Image description',
				fileName: 'placeholder',
				url: 'placeholder',
			}],
			component: 'TextCenterComponent',
			type: 1,
			relationType: 3,
		}],
		features: [{
			id: 8,
			slug: '/contacts',
			title: 'Contacts',
			abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
			type: 1
		}],
		taxonomies: [{
			id: 2,
			name: 'Page Tag',
			type: 0
		}]
	}, {
		id: 2000,
		slug: '/products',
		url: 'https://actarian.github.io/designr/#/products',
		title: 'Duis luctus ullamcorper risus imperdiet maximus.',
		abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
		description: '<p>Ut ultrices condimentum urna, et aliquam orci semper ut. Donec eleifend sapien vel vestibulum cursus. Duis luctus ullamcorper risus imperdiet maximus. Vestibulum volutpat mauris diam, eget tempor lorem ultrices a.</p><p>Suspendisse non aliquet arcu. Praesent a enim accumsan orci semper venenatis non eget lorem. Praesent rhoncus molestie lectus id semper.</p>',
		component: 'ProductsComponent',
		type: 1,
		active: true,
		meta: {
			title: 'Page Meta Title',
			description: 'Page Meta Description',
			keywords: 'keyword,keyword',
			robots: 'index,follow'
		},
		images: [{
			id: 0,
			type: 1,
			description: 'Image description',
			fileName: 'placeholder',
			url: 'placeholder',
		}],
		features: [{
			id: 8,
			slug: '/contacts',
			title: 'Contacts',
			abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
			type: 1
		}],
		taxonomies: [{
			id: 2,
			name: 'Page Tag',
			type: 0
		}]
	}, {
		id: 3000,
		slug: '/contacts',
		url: 'https://actarian.github.io/designr/#/contacts',
		title: 'Praesent a enim accumsan orci.',
		abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
		description: '<h3>Telefono</h3>\r\n\r\n<p>Per informazioni e assistenza nella scelta di acquisto della tua vacanza, contattaci allo&nbsp;<strong>045 9599</strong>.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3>Orari</h3>\r\n\r\n<p><strong>Lunedì - Venerdì,&nbsp;</strong><span style=\'line-height: 1.6;\'>dalle 09:00 alle 18:00</span></p>\r\n\r\n<p><strong>Sabato,&nbsp;</strong>dalle 09:00 alle 13:00</p>',
		component: 'ContactComponent',
		type: 6,
		active: true,
		meta: {
			title: 'Richiesta di contatto',
			description: 'Page Meta Description',
			keywords: 'richiesta di contatto, contatto',
			robots: 'index,follow'
		},
		images: [{
			type: 1,
			description: 'Image description',
			fileName: 'placeholder',
			url: 'placeholder',
			id: 0
		}],
		related: [{
			id: 10000,
			slug: '/related-0',
			url: 'https://actarian.github.io/designr/#/related-0',
			name: 'Related 00',
			title: 'Related 00',
			abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
			images: [{
				id: 0,
				type: 1,
				description: 'Image description',
				fileName: 'placeholder',
				url: 'placeholder',
			}],
			component: 'CardsComponent',
			type: 1,
			relationType: 3,
		}, {
			id: 10001,
			slug: '/related-1',
			url: 'https://actarian.github.io/designr/#/related-1',
			name: 'Related 01',
			title: 'Related 01',
			abstract: 'Nam id suscipit tellus. Sed nec massa non mauris semper mattis in eget est.',
			images: [{
				id: 0,
				type: 1,
				description: 'Image description',
				fileName: 'placeholder',
				url: 'placeholder',
			}],
			component: 'TextCenterComponent',
			type: 1,
			relationType: 3,
		}],
		features: [{
			id: 8,
			slug: '/',
			title: 'Homepage',
			abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a erat aliquet magna ultricies fermentum non quis ex.',
			type: 1
		}]
	}
	*/
];
