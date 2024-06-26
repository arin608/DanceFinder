// DanceFinderController.java
package com.dancefinder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.dancefinder.model.SearchRecord;
import com.dancefinder.repository.SearchRecordRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/danceFinder")
@CrossOrigin(origins = "http://localhost:3000")
public class DanceFinderController {

    @Autowired
    private SearchRecordRepository searchRecordRepository;
    
    @Value("${youtube.api.key}")
    private String apiKey;

    @PostMapping("/search")
    public SearchRecord search(@RequestParam String title, @RequestParam String artist) {
        String query = title + " " + artist + " official dance performance";

        String youtubeApiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + query + "&key=" + apiKey + "&maxResults=1";

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response = restTemplate.getForObject(youtubeApiUrl, Map.class);
        
        // API 응답에서 'items'가져오기
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");
        if (items.isEmpty()) {
            throw new RuntimeException("No video found");
        }

        Map<String, Object> firstItem = items.get(0);
        Map<String, Object> id = (Map<String, Object>) firstItem.get("id");
        String videoId = (String) id.get("videoId");

        SearchRecord searchRecord = new SearchRecord();
        searchRecord.setTitle(title);
        searchRecord.setArtist(artist);
        searchRecord.setYoutubeLink("https://www.youtube.com/watch?v=" + videoId);

        searchRecordRepository.save(searchRecord);

        return searchRecord;
    }

    @GetMapping("/searchHistory")
    public List<SearchRecord> getSearchHistory() {
        return searchRecordRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSearchRecord(@PathVariable Long id) {
        searchRecordRepository.deleteById(id);
    }
}

































