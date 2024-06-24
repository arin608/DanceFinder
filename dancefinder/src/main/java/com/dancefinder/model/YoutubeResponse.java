package com.dancefinder.model;

import java.util.List;

import lombok.Data;

@Data
public class YoutubeResponse {
	
	private List<Item> items;
	
	@Data
	public static class Item{
		private Id id;
		private Snippet snippet;
		
		@Data
		public static class Id{
			private String videoId;
		}
		
		@Data
		public static class Snippet {
			private String title;
			private String channelTitle;
		}
		
	}

}
