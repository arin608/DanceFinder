// DanceFinderController.java
package com.dancefinder.controller;

import com.dancefinder.model.SearchResult;
import com.dancefinder.service.DanceFinderService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/danceFinder")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DanceFinderController {

    private final DanceFinderService danceFinderService;
    private final List<SearchResult> searchHistory = new ArrayList<>();

    @PostMapping("/search")
//    public ResponseEntity<?> searchYouTube(@RequestBody SearchQuery searchQuery) {
//    	return ResponseEntity.ok().body("Search result");
//    }
    
    public List<SearchResult> searchDanceVideos(@RequestParam String title, @RequestParam String artist) {
        List<SearchResult> results = danceFinderService.findDanceVideos(title, artist);
        searchHistory.addAll(results); // 검색 결과를 기록에 추가
        return results;
    }

    @GetMapping("/history")
    public List<SearchResult> getSearchHistory() {
        return searchHistory;
    }

    @PutMapping("/history/{index}")
    public SearchResult updateSearchHistory(@PathVariable int index, @RequestBody SearchResult updatedResult) {
        if (index >= 0 && index < searchHistory.size()) {
            searchHistory.set(index, updatedResult);
            return updatedResult;
        } else {
            throw new IllegalArgumentException("Invalid index");
        }
    }

    @DeleteMapping("/history/{index}")
    public void deleteSearchHistory(@PathVariable int index) {
        if (index >= 0 && index < searchHistory.size()) {
            searchHistory.remove(index);
        } else {
            throw new IllegalArgumentException("Invalid index");
        }
    }
}






























