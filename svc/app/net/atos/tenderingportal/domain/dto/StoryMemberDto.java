package net.atos.tenderingportal.domain.dto;

/**
 * Created by a149635 on 10/12/2015.
 */
public class StoryMemberDto {

    private Long storyMemberId;

    private String email;

    private String role;

    private StoryDto story;

    public StoryDto getStory() {
        return story;
    }

    public void setStory(StoryDto story) {
        this.story = story;
    }

    public Long getStoryMemberId() {
        return storyMemberId;
    }

    public void setStoryMemberId(Long storyMemberId) {
        this.storyMemberId = storyMemberId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
