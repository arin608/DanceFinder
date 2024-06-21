package com.dancefinder.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import com.dancefinder.model.SearchResult;

public class DanceFinderService {
	
	@Value("${youtube.api.key}")
	private String apikey;
	
	public List<SearchResult> searchYoutube(String query) {
		
		RestTemplate restTemplate = new RestTemplate();
		String url = "";
		
		Map<String, Object> response = restTemplate.getForObject(url, Map.class);
		List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");
		
		List<SearchResult> searchResults = new ArrayList<>();
		
		for (Map<String, Object> item : items) {
			Map<String, Object> id = (Map<String, Object>) item.get("id");
			Map<String, Object> snippet = (Map<String, Object>) item.get("snippet");
			
			String videoId = (String) id.get("videoId");
			String title = (String) snippet.get("title");
			String channelTitle = (String) snippet.get("channelTitle");
			
			searchResults.add(new SearchResult(videoId, title, channelTitle));
			
		}
		return searchResults;
		
	}

}


























