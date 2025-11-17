// レスポンス(passwordは含めない)
export type UserType = {
	id: number;
	name: string;
	email: string;
};

export type AuthType = {
	user: UserType;
	token: string;
};

// リクエスト(passwordは含める)
export type SignupRequest = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

export type SigninRequest = {
	email: string;
	password: string;
};
