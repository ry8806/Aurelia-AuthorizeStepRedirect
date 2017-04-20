import { inject } from "aurelia-framework";

import { ApiService, Song } from "../api/api-service";

@inject(ApiService)
export class Edit {
	public Song: Song;

	constructor(private Api: ApiService) {

	}

	public activate(params: any) {
		let songId = params.id;
		this.Song = this.Api.GetSong(songId);
	}
}