// DanceFinderService.java
package com.dancefinder.service;

import com.dancefinder.model.SearchResult;
import com.dancefinder.model.YoutubeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class DanceFinderService {

    @Value("${youtube.api.key}")
    private String apiKey;

    public List<SearchResult> findDanceVideos(String title, String artist) {
        String query = title + " " + artist + " dance";
        String url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + query + "&type=video&videoCategoryId=17&key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        YoutubeResponse response = restTemplate.getForObject(url, YoutubeResponse.class);

        List<SearchResult> results = new ArrayList<>();
        if (response != null) {
            results = response.getItems().stream().map(item -> new SearchResult(
                    item.getId().getVideoId(),
                    item.getSnippet().getTitle(),
                    item.getSnippet().getChannelTitle()
            )).toList();
        }
        return results;
    }
}



























