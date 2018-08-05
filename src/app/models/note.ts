import { Tag } from './tag';
export class Note {
	id: number;
	title: string;
	body: string;
	important: boolean;
	tags: Tag[] = [];
}
