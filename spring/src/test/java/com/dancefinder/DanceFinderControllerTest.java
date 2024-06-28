package com.dancefinder;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class DanceFinderControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	public void testSearchAPI() throws Exception {
		String title = "Dynamite";
		String artist = "BTS";
		
		mockMvc.perform(post("/api/danceFinder/search")
				.param("title", title)
				.param("artist", artist))
				.andExpect(status().isOk());
	}
	
	@Test
	public void testGetSearchHistory() throws Exception {
		
		mockMvc.perform(get("/api/danceFinder/searchHistory"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$").isArray());
	}
	
	@Test
	public void testDeleteSearchRecord() throws Exception {
		String title = "Permission to Dance";
		String artist = "BTS";
		
		mockMvc.perform(post("/api/danceFinder/search")
				.param("title", title)
				.param("artist", artist))
				.andExpect(status().isOk());
		
		String responseString = mockMvc.perform(get("/api/danceFinder/searchHistory"))
				.andExpect(status().isOk())
				.andReturn()
				.getResponse()
				.getContentAsString();
		
		SearchRecord[] records = objectMapper.readValue(responseString, SearchRecord[].class);
		Long id = records[0].getId();
		
		mockMvc.perform(delete("/api/danceFinder/delete/" + id))
				.andExpect(status().isOk());
	}
	
	public static class SearchRecord {
		
		private Long id;
		private String title;
		private String artist;
		private String youtubeLink;
		
		public SearchRecord() {}
		
		public Long getId() {
			return id;
		}
		
		public String getTitle() {
			return title;
		}
		
		public void setTitle(String title) {
			this.title = title;
		}
		
		public String getArtist() {
			return artist;
		}
		
		public void setArtist(String artist) {
			this.artist = artist;
		}
		
		public String getYoutubeLink() {
			return youtubeLink;
		}
		
		public void setYoutubeLink(String youtubeLink) {
			this.youtubeLink = youtubeLink;
		}
		
	}

}

































