export type Activity = {
	created_at: Date | null;
	reference_id: number ;
	activity?: string;
	link?: string;
	content?: string;
	action: string;
	is_thread: boolean;
	is_post: boolean;
	is_like: boolean;
	is_comment: boolean;
	thread?: {
		title: string;
		created_at: Date;
	};
	post?: {
		content: string;
		created_at: Date;
	};
	comment?: {
		content: string;
		created_at: Date;
	};
	like?: {
		created_at: Date;
	};
};