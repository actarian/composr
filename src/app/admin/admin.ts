

export class AdminToken {
	accessToken?: string;
}

export class AdminAuth {
	username?: string;
	password?: string;
	isPersisted?: string;
	accessToken?: string;
}

export class Admin {
	id: string;
	email?: string;
	firstName?: string;
	lastName?: string;

	password?: string;
	role?: number;
	userName?: string;
	normalizedUserName?: string;
	normalizedEmail?: string;
	emailConfirmed?: true;
	passwordHash?: string;
	securityStamp?: string;
	concurrencyStamp?: string;
	phoneNumber?: string;
	phoneNumberConfirmed?: boolean;
	twoFactorEnabled?: boolean;
	lockoutEnd?: Date;
	lockoutEnabled?: boolean;
	accessFailedCount?: number;
}

export class AdminSignIn extends AdminAuth {
	passwordReveal?: boolean; // todo
	rememberMe?: boolean; // todo
}

export class AdminSignUp extends AdminAuth {
	emailConfirm?: string; // todo
	passwordReveal?: boolean = true; // todo
}

export class AdminSignForgotten {
	email: string;
}

export class AdminFinancialDetail {
	creditLimit: number;
	c_PaymentType: number;
	s_PaymentType: number;
	enableElectronicInvoicing: false;
}

export class AdminRegister {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;

	address?: string;
	zipCode?: string;
	cityName?: string;
	countyCode?: string;
	stateCode?: string;

	gender?: string;
	birthDate?: Date | string;
	birthCity?: string;
	birthCounty?: string;
	nationality?: string;

	fiscalCode?: string;
	vatCode?: string;

	citizenshipCode?: string;
	areaCode?: string;

	verifyDiscount?: boolean;

	isLogged?: boolean;

	name?: string;
	createdDate?: Date | string;
	modifiedDate?: Date | string;
	recordType?: number;
	loginType?: number;
	recordStatus?: number;
	thirdPartRecordCode?: string;
	moniker?: string;
	searchField?: string;
	extraInfo?: string;
	languageCode?: string;
	zoneCode?: string;
	branchOfficeCode?: string;
	categoryCode?: string;
	activityCode?: string;
	promoterCode?: string;
	networkCode?: string;
	firstPhoneNumber?: string;
	secondPhoneNumber?: string;
	faxNumber?: string;
	mobilePhoneNumber?: string;
	webUrl?: string;
	encryptedPassword?: boolean;
	priceListCode?: string;
	costListCode?: string;
	discountCode?: string;
	cardNumber?: string;
	badgeNumber?: string;
	electronicInvoiceCertifiedMail?: string;
	refMasterRecords?: {
		billingRefCode?: string;
		paymentRefCode?: string;
		voucherRefCode?: string;
		supplierRefCode?: string;
	};
	idDocumentDetail?: {
		idType?: string;
		idCode?: string;
		idIssueLocation?: string;
		idIssueCounty?: string;
		idIssueDate?: Date | string;
		idExpireDate?: Date | string;
	};
	financialDetail?: {
		currencyCode?: string;
		creditLimit?: number;
		c_PaymentType?: number;
		c_SpecPaymentTypeCode?: string;
		c_BookingPayConditionCode?: string;
		c_BillingPayConditionCode?: string;
		c_CodMastro?: string;
		c_CodConto?: string;
		s_PaymentType?: number;
		s_SpecPaymentTypeCode?: string;
		s_BookingPayConditionCode?: string;
		s_BillingPayConditionCode?: string;
		s_CodMastro?: string;
		s_CodConto?: string;
		enableElectronicInvoicing?: true
	};
	bankDetail?: {
		name?: string;
		branchOffice?: string;
		location?: string;
		countyCode?: string;
		ibanCode?: string;
		swiftCode?: string;
	};
	paInfo?: {
		paOfficeCode?: string;
		paAdministrativeRefCode?: string;
		vatSplitPaymentEnabled?: boolean;
		eInvoicingEnabled?: true
	};
	carrierDetail?: {
		carrierType?: number;
		iataCode?: string;
		carrierNumber?: string;
		bspAssociated?: true
	};
	natFlightCommission?: {
		supplierRecordCode?: string;
		amount?: 0
	};
	interFlightCommission?: {
		supplierRecordCode?: string;
		amount?: 0
	};
	natRailCommission?: {
		supplierRecordCode?: string;
		amount?: 0
	};
	interRailCommission?: {
		supplierRecordCode?: string;
		amount?: 0
	};
	interNavalCommission?: {
		supplierRecordCode?: string;
		amount?: 0
	};
	associatedTravelAgents?: [
		{
			code?: string;
			name?: string;
			birthDate?: Date | string;
		}
	];
	notes?: [
		{
			nType?: number;
			title?: string;
			value?: string;
		}
	];
	accountPolicies?: {
		acceptProfilingPolicies?: boolean;
		acceptPrivacyPolicies?: boolean;
		acceptNewsletterPolicies?: true
	};
	recordCode?: string;
	insertCriteria?: string;
	placeEmissionDocument?: string;
	roomingNote?: string;
}
